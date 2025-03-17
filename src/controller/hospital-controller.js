const prisma = require('../configs/prisma')
const createError = require('../utils/createError')

//done
exports.adminGetAllHospital = async (req, res, next) => {
    try {
      const hospitals = await prisma.hospital.findMany({
        include: {
          location: true // Include the related location data
        }
      });
      
      res.json({
        message: "Get Hospital list",
        data: hospitals,
      });
    } catch (error) {
      next(error);
    }
  };

  //done
  exports.adminCreateHospital = async (req, res, next) => {
    try {
        const { name, contactInfo, latitude, longitude, address } = req.body;

        const checkHospital = await prisma.hospital.findFirst({
            where: {
                name: name,
            },
        });

        if (checkHospital) {
            return next(createError(400, "Hospital is already in system"));
        }

        const profileImg = req.file ? req.file.path : null;

        const hospital = await prisma.hospital.create({
            data: {
                name: name,
                contactInfo: contactInfo,
                profileImg: profileImg,
                location: {
                    create: {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        address: address,
                    },
                },
            },
            include: {
                location: true,
            },
        });

        res.json({ message: "Create Hospital Successfully", hospital });
    } catch (error) {
        next(error);
    }
};

//done
exports.adminGetHospital = async (req, res, next) =>{
    const {id} = req.params
    try {
        if(!id){
            return createError(400, "Hospital ID Must be provided")
        }
        if(isNaN(Number(id))){
            return createError(400, "Invalid Hospital ID")
        }
        const getHospital = await prisma.hospital.findFirst({
            where:{
                id: Number(id)
            },
            select:{
                id:true,
                name:true,
                profileImg:true,
                contactInfo:true,
                location:{
                    select:{
                        id: true,
                        address:true
                    }
                }
            }
        })
        res.json({getHospital:getHospital,
            message: "Get A Hospital Successfully"
        })
    } catch (error) {
        next(error)
    }
}


exports.adminUpdateHospital = async(req, res, next) => {
    try {
        // Debug logs to see what's available
        console.log("Request params:", req.params);
        console.log("Request body:", req.body);
        console.log("Request query:", req.query);
        
        const { id } = req.params; // Get ID from URL parameters
        console.log("Extracted ID:", id); // Check if this is undefined
        
        const { contactInfo,name } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Hospital ID is required"
            });
        }
        
        const updateHospital = await prisma.hospital.update({
            where: { id: parseInt(id) },
            data: {
                contactInfo: contactInfo,
                name:name
            }
        });
        
        res.json({
            message: "Update hospital successfully",
            data: updateHospital,
        });
    } catch (error) {
        console.error("Error updating hospital:", error);
        next(error);
    }
}

exports.adminUpdateHospital = async(req, res, next) => {
    try {
        // Debug logs to see what's available
        console.log("Request params:", req.params);
        console.log("Request body:", req.body);
        console.log("Request query:", req.query);
        
        const { id } = req.params; // Get ID from URL parameters
        console.log("Extracted ID:", id); // Check if this is undefined
        
        const { contactInfo } = req.body;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Hospital ID is required"
            });
        }
        
        const updateHospital = await prisma.hospital.update({
            where: { id: parseInt(id) },
            data: {
                contactInfo: contactInfo,
            }
        });
        
        res.json({
            message: "Update hospital successfully",
            data: updateHospital,
        });
    } catch (error) {
        console.error("Error updating hospital:", error);
        next(error);
    }
}
exports.adminDeleteHospital = async(req, res, next) => {
    try {
        const { hospital_id } = req.body;
        
        // Validate input
        if (!hospital_id) {
            return res.status(400).json({
                success: false,
                message: "Hospital ID is required"
            });
        }

        // First check if hospital exists
        const hospital = await prisma.hospital.findUnique({
            where: { hospital_id: parseInt(hospital_id) },
            include: { doctors: true }
        });

        if (!hospital) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found"
            });
        }

        // Check if hospital has related doctors
        if (hospital.doctors && hospital.doctors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete hospital with associated doctors. Remove all doctors from this hospital first.",
                doctorCount: hospital.doctors.length
            });
        }

        // Proceed with deletion if no related records
        const deleteHospital = await prisma.hospital.delete({
            where: {
                hospital_id: parseInt(hospital_id)
            }
        });
        
        res.status(200).json({
            success: true,
            message: "Hospital deleted successfully",
            data: deleteHospital
        });  
    } catch (error) {
        console.error("Error deleting hospital:", error);
        
        // If it's still failing with a foreign key constraint
        if (error.code === 'P2003') {
            return res.status(400).json({
                success: false,
                message: "Cannot delete hospital with associated records. There might be appointments or other records referencing this hospital."
            });
        }
        
        next(error);
    }
}

exports.userGetAllHospital = async (req, res, next) => {
    try {
      const hospitals = await prisma.hospital.findMany({
        include: {
          location: true // Include the related location data
        }
      });
      
      res.json({
        message: "Get Hospital list",
        data: hospitals,
      });
    } catch (error) {
      next(error);
    }
  };
