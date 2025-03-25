const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const stripe = require("stripe");

//create order for Program 

exports.userCreateOrder = async (req, res, next) => {
  const programId = parseInt(req.params.programId);
  const status = req.body.status;
  const userId = req.user.id;
  const {date , time} = req.body
  const dateTimeString = `${date}T${time}:00`;
  const utcDate = new Date(dateTimeString);
  const bangkokTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);


  try {
    const result = await prisma.$transaction(async (prisma) => {
      //1. find user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return createError(404, `User with ID ${userId} not found`);
      }
      //2. find program
      const program = await prisma.program.findUnique({
        where: { id: programId },
      });

      if (!program) {
        return createError(404, `Program with ID ${programId} not found`);
      }
      const payment = await prisma.payment.create({
        data: {
          amount: program.price,
          method: "CREDIT_CARD",
          status: "PENDING",
          paymentDate: new Date(),
        },
      });
      const order = await prisma.order.create({
        data: {
          userId,
          programId,
          orderDate:bangkokTime,
          paymentId: payment.id,
          status: "PENDING",
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          program: true,
          payment: true,
        },
      });
      return order;
    });
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.userCreateAppointmentOrder = async (req, res, next) => {
  const appointmentId = parseInt(req.params.appointmentId);
  const userId = req.user.id;
  const { date, time } = req.body;

  if (!date || !time) {
    return next(createError(400, "Date and time are required"));
  }

  const startTime = time.split(" - ")[0]; // "09:00"

  const dateTimeString = `${date}T${startTime}:00`;

  const utcDate = new Date(dateTimeString);

  if (isNaN(utcDate.getTime())) {
    return next(createError(400, "Invalid date or time format"));
  }

  const bangkokTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

  const appointmentPrice = 100;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      //1. Find user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return createError(404, `User with ID ${userId} not found`);
      }

      //2. Find appointment
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        return createError(404, `Appointment with ID ${appointmentId} not found`);
      }

      //3. Create payment
      const payment = await prisma.payment.create({
        data: {
          amount: appointmentPrice,
          method: "CREDIT_CARD",
          status: "PENDING",
          paymentDate: new Date(),
        },
      });

      //4. Create order
      const order = await prisma.order.create({
        data: {
          userId,
          appointmentId,
          orderDate: bangkokTime,
          paymentId: payment.id,
          status: "PENDING",
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
            },
          },
          appointment: true,
          payment: true,
        },
      });

      return order;
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


exports.userUpdateOrder = async (req, res, next) => {
  const orderId = parseInt(req.body.orderId); 
  const { status } = req.body;
  const userId = req.user.id;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.findUnique({
        where: {
          id: orderId
        },
        include: { payment: true },
      });
      if (!order) {
        return createError(404, `Order with ID ${orderId} not found`);
      }
      if (order.userId !== userId) {
        return createError(403, `You don't have permission to update this order`);
    }
    const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    firstname: true,
                    lastname: true,
                },
            },
            program: true,
            payment: true
            
        },
    });
    if (status === "SUCCESS") {
        await prisma.payment.update({
            where: { id: order.paymentId },
            data: { status: "SUCCESS" }
        });
    } else if (status === "CANCELLED") {
        await prisma.payment.update({
            where: { id: order.paymentId },
            data: { status: "CANCELLED" }
        });
    }
    return updatedOrder;
    });
    res.status(200).json({
        success: true,
        data: result
    });
  } catch (error) {
    next(error);
  }
};

exports.adminGetAllOrder = async (req, res, next) =>{
    try {
    const getOrder = await prisma.order.findMany({
        select:{
            id:true,
            orderDate:true,
            status:true,
            program:{
                select:{
                    name:true,
                    price:true
                }
            }
        }
    })
    res.status(200).json({
        success: true,
        data: getOrder
    });
} catch (error) {
    next(error)
}

}

exports.userGetOrderById = async (req, res, next) =>{
try {
    const id = req.params.orderId
    console.log("Received request for orderId:",id);

    if (!id) {
        return createError(400, "ORDER ID Must be provided");
      }
      if (isNaN(Number(id))) {
        return createError(400, "Invalid ID");
      }
      const getOrder = await prisma.order.findFirst({
        where: {
            id: Number(id),
          },
          select:{
            id:true,
            orderDate:true,
            status:true,
            program:{
                select:{
                    name:true,
                    price:true,
                    profileImg:true
                }
            }
          }
      })
      if (!getOrder) {
        return next(createError(404, `Order with ID ${id} not found`));
      }
      res.status(200).json({
        success: true,
        data: getOrder
        
    });
} catch (error) {
    next(error)
}


}