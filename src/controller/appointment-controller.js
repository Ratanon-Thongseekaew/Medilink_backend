const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const { date } = require("zod");

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

module.exports.userCreateAppointment = async (req, res, next) => {
  try {
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 91);
    console.log(futureDate);

    // console.log("hi createAppointment")
    const userId = req.user.id;
    const doctorId = Number(req.params.doctorId);
    console.log("User from middleware", req.user);
    // console.log("UserId extracted:", userId);
    console.log("doctorId :>> ", doctorId);
    console.log("req.params :>> ", req.params);

    const {
      selectedDate,
      // paymentId,
      // note,
      doctorScheduleId,
      doctorOvertimeId,
    } = req.body;

    const appointmentDate = new Date(selectedDate);
    const appointmentDay = days[appointmentDate.getDay()];

    function isValidId(id, errorMeassage) {
      if (!id || isNaN(id)) return createError(errorMeassage);
    }
    if (!req.user) {
      return res
        .status(400)
        .json({ message: "User is missing or not authenticated." });
    }

    isValidId(doctorId, "no doctor id");

    if (!doctorOvertimeId && !doctorScheduleId) {
      createError(400, "schedule invalid");
    }

    if (doctorOvertimeId && doctorScheduleId) {
      createError(400, "schedule must be one");
    }

    if (doctorScheduleId) {
      if (isNaN(doctorScheduleId)) {
        createError(400, "invalid doctor overtime id");
      }
      const doctorSchedule = await prisma.doctorSchedule.findUnique({
        where: {
          id: doctorScheduleId,
          day: appointmentDay,
        },
      });

      if (!doctorSchedule) {
        createError(400, "schedule not found");
      }
    }

    if (doctorOvertimeId) {
      if (isNaN(doctorOvertimeId)) {
        createError(400, "invalid doctor overtime id");
      }

      const doctorOvertime = await prisma.doctorOvertime.findUnique({
        where: {
          id: doctorOvertimeId,
          date: appointmentDate,
        },
      });

      if (!doctorOvertime) {
        createError(400, "overtime not found");
      }
    }

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: Number(doctorId),
      },
    });

    if (!doctor) {
      createError(400, "doctor not found");
    }

    if (
      new Date(appointmentDate) <= now ||
      new Date(appointmentDate) > futureDate
    ) {
      createError(
        400,
        "Appointments can be scheduled from tomorrow to 90 days ahead"
      );
    }

    // const payment = await prisma.payment.findUnique({
    //   where: {
    //     payment_id,
    //   },
    // });

    // if (!payment) {
    //   createError(400, "payment not found");
    // }

    // /**
    //  *   doctor Id , date > today

    // // doctorid idทั้งหมด isnan มีมั้ย , number มั้ย
    // //  *

    const createAppointmentData = {
      doctor: {
        connect: { id: Number(doctorId) },
      },
      user: {
        connect: { id: Number(userId) },
      },
      // paymentId,
      // note,
      appointmentDate,
    };

    if (doctorOvertimeId) {
      createAppointmentData.DoctorOvertime = {
        connect: { id: Number(doctorOvertimeId) },
      };
    } else if (doctorScheduleId) {
      createAppointmentData.DoctorSchedule = {
        connect: { id: Number(doctorScheduleId) },
      };
    }

    console.log("createAppointmentData :>> ", createAppointmentData);

    const schedule = {};
    if (doctorOvertimeId) {
      schedule.doctorOvertimeId = Number(doctorOvertimeId);
    } else if (doctorScheduleId) {
      schedule.doctorScheduleId = Number(doctorScheduleId);
    }

    const appointed = await prisma.appointment.findFirst({
      where: {
        doctorId,
        appointmentDate,
        ...schedule,
      },
    });

    if (appointed) {
      createError(400, "this timeslot is already appointed");
    }

    const appointment = await prisma.appointment.create({
      data: createAppointmentData,
    });

    res.json({
      appointment: appointment,
      message: "create appointment successfully",
    });
  } catch (error) {
    next(error);
  }
};


exports.userGetAppointmentbyId = async (req, res, next) => {
  const  {id}  = req.params;
try {
  if (!id) {
    return createError(400, "Appointment ID Must be provided");
  }
  if (isNaN(Number(id))) {
    return createError(400, "Invalid ID");
  }
  const getAppointment = await prisma.appointment.findFirst({
    where: {
      id: Number(id),
    },
    select:{
      id: true,
      userId:true,
      doctorId:true,
      appointmentDate:true,
      status:true,
      createdAt:true
    },
  });
  if (!getAppointment) {
    return next(createError(404, "Appointment not found"));
  }
  res.status(201).json({
    message: " get appointment successfully",
    data: getAppointment,
  });
} catch (error) {
 next(error) 
}
}