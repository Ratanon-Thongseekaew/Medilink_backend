const createError = require("../utils/createError");
const prisma = require("../configs/prisma");

module.exports.getDoctordatas = async (req, res, next) => {
  try {
    const doctorDatas = await prisma.doctor.findMany();

    res.json({ doctorDatas });
  } catch (error) {
    next(error);
  }
};

module.exports.getDoctordatasbySpecialty = async (req, res, next) => {
  try {
    const { specialtyId } = req.body;

    if (!specialtyId) {
      createError(400, "specialty id must be provided");
    }

    const doctordatasbySpecialty = await prisma.doctor.findMany({
      where: {
        specialtyId,
      },
    });

    res.json({ doctordatasbySpecialty });
  } catch (error) {
    next(error);
  }
};
