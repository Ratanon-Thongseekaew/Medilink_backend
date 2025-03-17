const createError = require("../utils/createError");
const prisma = require("../configs/prisma");

module.exports.getDoctorScheduleByID = async (req, res, next) => {
  try {
    const { id } = req.body;

    const schedule = await prisma.doctorSchedule.findMany({
      where: {
        doctorId: Number(id),
      },
    });

    res.json({ schedule });
  } catch (error) {
    next(error);
  }
};
