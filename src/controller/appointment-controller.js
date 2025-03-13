const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const { date } = require("zod");

module.exports.userCreateAppointment = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const {
      doctor_id,
      appointment_date,
      payment_id,
      note,
      doctorScheduleId,
      doctorOvertimeId,
    } = req.body;

    function isValidId(id, errorMeassage) {
      if (!id || isNaN(id)) return createError(errorMeassage);
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
      doctor_id,
      payment_id,
      note,
      appointment_date: new Date(appointment_date),
      user_id,
    };

    if (doctorOvertimeId) {
      createAppointmentDate.doctorOvertimeId = doctorOvertimeId;
    } else if (doctorScheduleId) {
      createAppointmentDate.doctorScheduleId = doctorScheduleId;
    }

    const appointment = await prisma.appointment.create({
      data: createAppointmentDate,
    });

    res.json({ appointment });
  } catch (error) {
    next(error);
  }
};
