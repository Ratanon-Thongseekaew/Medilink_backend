const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const stripe = require("stripe");
//doing

exports.userCreateOrder = async (req, res, next) => {
  const programId = parseInt(req.params.programId);
  const status = req.body.status;
  const userId = req.user.id;
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
          orderDate: new Date(),
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