const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const { date } = require("zod");

module.exports.userCreateAppointment = async (req, res, next) => {
  try {
    // console.log("hi createAppointment")
    const userId = req.user.id
    console.log("User from middleware:sadfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf", req.user);
    // console.log("UserId extracted:", userId);
    const {
      doctorId,
      appointmentDate,
      paymentId,
      note,
      doctorScheduleId,
      doctorOvertimeId,
    } = req.body;

    function isValidId(id, errorMeassage) {
      if (!id || isNaN(id)) return createError(errorMeassage);
    }
    if (!req.user) {
      return res.status(400).json({ message: 'User is missing or not authenticated.' });
    }

    // isValidId(doctor_id, "no doctor id");
    // isValidId(payment_id, "no payment id");
    // // isValidId(doctorScheduleId, "no schedule id");
    // // isValidId(doctorOvertimeId, "no overtime id");

    // const doctor = await prisma.doctor.findUnique({
    //   where: {
    //     id: Number(doctor_id),
    //   },
    // });

    // if (!doctor) {
    //   createError(400, "doctor not found");
    // }

    // if (appointment_date <= new Date()) {
    //   createError(400, "date is past");
    // }

    // const payment = await prisma.payment.findUnique({
    //   where: {
    //     payment_id,
    //   },
    // });

    // if (!payment) {
    //   createError(400, "payment not found");
    // }

    // const doctorSchedule = await prisma.doctorSchedule.findUnique({
    //   where: {
    //     doctorScheduleId,
    //   },
    // });

    // if (!doctorSchedule) {
    //   createError(400, "schedule not found");
    // }

    // const doctorOvertime = await prisma.doctorOvertime.findUnique({
    //   where: {
    //     doctorOvertimeId,
    //   },
    // });

    // if (!doctorOvertime) {
    //   createError(400, "overtime not found");
    // }

    // /**
    //  *   doctor Id , date > today

    // // doctorid idทั้งหมด isnan มีมั้ย , number มั้ย
    // //  *

    const createAppointmentDate = {
      doctorId,
      paymentId,
      note,
      appointmentDate: new Date(appointmentDate),
      userId,
    };

    if (doctorOvertimeId) {
      createAppointmentDate.doctorOvertimeId = doctorOvertimeId;
    } else if (doctorScheduleId) {
      createAppointmentDate.doctorScheduleId = doctorScheduleId;
    }
    console.log("check appointment data:",{
      userId,
      doctorId,
      appointmentDate,
      paymentId,
      doctorScheduleId,
      doctorOvertimeId
    });
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: new Date(appointmentDate),
        note: note || "",
        user: {
          connect: { id: Number(userId) }
        },
        doctor: {
          connect: { id: Number(doctorId) }
        },
        payment: {
          connect: {id: Number(paymentId)}
        },
        DoctorSchedule:{
          connect:  {id: Number(doctorScheduleId)}
        }
        // Handle optional connections separately to avoid undefined issues
      }
    });
    
    
    res.json({ appointment: appointment, message: "create appointment successfully" });
  } catch (error) {
    next(error);
  }
};
