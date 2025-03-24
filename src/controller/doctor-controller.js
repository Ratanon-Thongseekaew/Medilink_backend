const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const cloudinary = require('../configs/cloudinary')
const path = require('path')
const fs =  require("fs/promises")

//done
exports.adminGetAllDoctors = async (req, res, next) => {
  try {
    const doctorDatas = await prisma.doctor.findMany({
      include: {
        specialty: true,
        hospital: true,
      },
    });

    res.json({ doctorDatas });
  } catch (error) {
    next(error);
  }
};

//done
exports.adminGetDoctorbySpecialty = async (req, res, next) => {
  try {
    const { specialtyId } = req.params;

    console.log("specialtyId :>> ", specialtyId);

    if (!specialtyId) {
      createError(400, "specialty id must be provided");
    }

    if (isNaN(Number(specialtyId))) {
      return createError(400, "Invalid specialty id");
    }

    const doctordatasbySpecialty = await prisma.doctor.findMany({
      where: {
        specialtyId: Number(specialtyId),
      },
      include: {
        specialty: true,
        hospital: true,
      },
    });

    res.json({ doctordatasbySpecialty });
  } catch (error) {
    next(error);
  }
};

module.exports.getDoctordatasbyHospital = async (req, res, next) => {
  try {
    const { hospitalId } = req.params;

    if (!hospitalId) {
      createError(400, "hospital id must be provided");
    }

    if (isNaN(Number(hospitalId))) {
      return createError(400, "Invalid hospital id");
    }

    const doctordatasbySpecialty = await prisma.doctor.findMany({
      where: {
        hospitalId: Number(hospitalId),
      },
      include: {
        specialty: true,
        hospital: true,
      },
    });

    res.json({ doctordatasbySpecialty });
  } catch (error) {
    next(error);
  }
};
//done
exports.adminGetDoctorById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      createError(400, "doctor id to be provided");
    }

    if (isNaN(Number(id))) {
      return createError(400, "Invalid doctor id");
    }

    const doctorDataById = await prisma.doctor.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        specialty: true,
        hospital: true,
      },
    });

    res.json(doctorDataById);
  } catch (error) {
    next(error);
  }
};

//done
exports.adminCreateDoctor = async (req, res, next) => {
  try {
    const { firstname, lastname, experience, specialtyId, hospitalId } =
      req.body;
    console.log("Request body:", req.body);
    const parsedSpecialtyId = Number(specialtyId);
    const parsedHospitalId = Number(hospitalId);
    if (isNaN(parsedSpecialtyId) || isNaN(parsedHospitalId)) {
      return res
        .status(400)
        .json({ message: "Invalid specialtyId or hospitalId" });
    }
    const checkDoctor = await prisma.doctor.findFirst({
      where: {
        firstname: firstname,
        lastname: lastname,
      },
    });
    if (checkDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor is already have in system" });
    }
    const profileImg = req.file ? req.file.path : null;
     //insert function for upload image
    const haveFile = !!req.file
    let uploadResult = {}

    if (haveFile) {

        uploadResult = await cloudinary.uploader.upload(req.file.path, {


            overwrite: true,
            public_id: path.parse(req.file.path).name
        })
        fs.unlink(req.file.path)
    }
    console.log('profileImg', profileImg)
    const createDoctor = await prisma.doctor.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        experience: experience,
        specialtyId: parsedSpecialtyId,
        hospitalId: parsedHospitalId,
        profileImg: uploadResult.secure_url || '',
      },
    });

    res.json({
      message: "Doctor created successfully",
      createDoctor: createDoctor,
    });
  } catch (error) {
    next(error);
  }
};
//doing
exports.adminUpdateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, experience, specialtyId, hospitalId } =
      req.body;
    console.log("req.bodydasdasdasdasdasdasd", req.body);
    console.log("req.params", req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }
    const profileImg = req.file ? req.file.path : undefined;
    //insert function for upload image
    const haveFile = !!req.file
    let uploadResult = {}

    if (haveFile) {

        uploadResult = await cloudinary.uploader.upload(req.file.path, {


            overwrite: true,
            public_id: path.parse(req.file.path).name
        })
        fs.unlink(req.file.path)
    }
    const updateData = {
      firstname,
      lastname,
      experience,
      specialtyId: specialtyId ? Number(specialtyId) : undefined,
      hospitalId: hospitalId ? Number(hospitalId) : undefined,
      profileImg: uploadResult.secure_url || '',
    };
    // if (profileImg) {
    //   updateData.profileImg = profileImg;
    // }
    const updateDoctor = await prisma.doctor.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.json({
      message: "Update Doctor successfully",
      data: updateDoctor,
    });
  } catch (error) {
    next(error);
  }
};

exports.adminDeleteDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteDoctor = await prisma.doctor.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: " delete doctor successfully",
      data: deleteDoctor,
    });
  } catch (error) {
    next(error);
  }
};

exports.adminCreateSpecialization = async (req, res, next) => {
  try {
    const { specialtyName } = req.body;
    const checkSpecialization = await prisma.specialty.findFirst({
      where: {
        specialtyName: specialtyName,
      },
    });
    if (checkSpecialization) {
      createError(400, "Specialization is already have in system");
    }
    const createSpecialization = await prisma.specialty.create({
      data: {
        specialtyName: specialtyName,
      },
    });
    res.status(201).json({
      message: "Specialization created successfully",
      data: createSpecialization,
    });
  } catch (error) {
    next(error);
  }
};

exports.adminGetAllSpecialization = async (req, res, next) => {
  try {
    const specializationData = await prisma.specialty.findMany({
      select: {
        id: true,
        specialtyName: true,
      },
    });
    res.status(201).json({
      message: "Specialization get successfully",
      data: specializationData,
    });
  } catch (error) {
    next(error);
  }
};
