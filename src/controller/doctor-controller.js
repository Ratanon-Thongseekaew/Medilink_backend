const createError = require("../utils/createError");
const prisma = require("../configs/prisma");

module.exports.getAllDoctordatas = async (req, res, next) => {
  try {
    const doctorDatas = await prisma.doctor.findMany({
      include: {
        specialty: true,
      },
    });

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

module.exports.getDoctorDataById = async (req, res, next) => {
  try {
    const { doctorId } = req.params;

    const doctorDataById = await prisma.doctor.findUnique({
      where: {
        id: Number(doctorId),
      },
      include: {
        specialty: true,
      },
    });

    res.json(doctorDataById);
  } catch (error) {
    next(error);
  }
};

// exports.adminGetAllDoctors =async(req,res,next)=>{
//    try {
//         const doctors = await prisma.doctor.findMany({})

//         // console.log(doctors)
//         res.json({
//             message: "Get Doctor list",
//             data: doctors,
//         });
//     } catch (error) {
//         next(error)

//     }
// }

// exports.adminCreateDoctor = async (req, res, next) => {
//     try {
//         const {
//             firstname,
//             lastname,
//             specialty_id,
//             hospital_id,

//             experience,
//         } = req.body;

//         // Validate and parse IDs
//         const parsedSpecialtyId = parseInt(specialty_id);
//         const parsedHospitalId = parseInt(hospital_id);

//         if (isNaN(parsedSpecialtyId) || isNaN(parsedHospitalId)) {
//             return res.status(400).json({ message: "Invalid specialty_id or hospital_id" });
//         }
//         const checkDoctor = await prisma.doctor.findFirst({
//             where :{
//                 firstname :firstname,
//                 lastname : lastname
//             }
//         })
//         if(checkDoctor){
//             return res.status(400).json({ message: "Doctor is already have in system" });
//         }

//         const doctor = await prisma.doctor.create({
//             data: {
//                 firstname,
//                 lastname,
//                 specialty_id: parsedSpecialtyId, // Direct assignment
//                 hospital_id: parsedHospitalId,   // Direct assignment
//                 availability,
//                 experience,
//             },
//         });

//         res.json({
//             message: "Doctor created successfully",
//             data: doctor,
//         });
//     } catch (error) {
//         console.error("Error creating doctor:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.adminUpdateDoctor= async(req,res,next)=>{
//     try {
//         const {doctor_id, hospital_id,availability,experience} = req.body
//         //update
//        const updateDoctor =  await prisma.doctor.update({
//             where : { doctor_id: doctor_id},
//             data: {
//                 hospital_id :hospital_id,
//                 availability:availability,
//                 experience:experience
//             }
//         })
//         res.json({
//             message: " update doctor successfully",
//             data: updateDoctor,
//         });
//     } catch (error) {
//         next(error)
//     }
// }

// exports.adminDeleteDoctor= async(req,res,next)=>{
//     try {
//         const {doctor_id } = req.body

//         const deleteDoctor = await prisma.doctor.delete({
//             where :{
//                 doctor_id: doctor_id
//             }
//         })
//         res.json({
//             message: " delete doctor successfully",
//             data: deleteDoctor,
//         });
//     } catch (error) {
//         next(error)
//     }

// }

// exports.adminCreateSpecialty = async(req,res,next) =>{
//     try {
//         // req.body
//     const { name } = req.body

//     const checkSpecialty = await prisma.specialty.findFirst({
//         where :{
//             specialty_name: name,
//         }
//     })
//     if(checkSpecialty){
//         createError(400, "Specialty is already have in system")
//     }

//     //add to db
//     const specialty = await prisma.specialty.create({
//         data: {
//             specialty_name: name,
//         }
//     })
//     res.json({message: "Create Specialty"})
//     } catch (error) {
//         next(error)
//     }
// }

// exports.adminCreateLocation = async(req,res,next)=>{
//     try {
//         const {latitude, longitude,address} = req.body

//         const checkLocation = await prisma.location.findFirst({
//             where :{
//                 latitude: latitude,
//                 longitude :longitude,
//                 address: address,
//             }
//         })
//         if(checkLocation){
//             createError(400, "Location is already have in system")
//         }

//         const location = await prisma.location.create({
//             data :{
//                 latitude: latitude,
//                 longitude :longitude,
//                 address: address,
//             }
//         })
//         res.status(201).json({
//             message: "Location created successfully",
//             data: location
//         });
//     } catch (error) {
//         next(error)
//     }

// }
