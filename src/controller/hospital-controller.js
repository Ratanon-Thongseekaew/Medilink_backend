const prisma = require('../configs/prisma')
const createError = require('../utils/createError')


exports.adminGetAllHospital =async(req,res,next)=>{
    try {
         const hospital = await prisma.hospital.findMany({})
 
         // console.log(doctors)
         res.json({
             message: "Get Hospital list",
             data: hospital,
         });
     } catch (error) {
         next(error)
         
     }
 } 

exports.adminCreateHospital = async(req,res,next)=>{
    try {
        const {name, contact_info, location} = req.body

        const checkHospital = await prisma.hospital.findFirst({
            where :{
                name: name,
            }
        })
        if(checkHospital){
            createError(400, "Hospital is already have in system")
        }

        const hospital = await prisma.hospital.create({
            data :{
                name: name,
                contact_info :contact_info,
                location: {
                    connect: {
                        location_id: parseInt(location), // Connect to existing Location
                    },
                },
                // profileImg: profileImg,
                
            }
        })
        res.json({message :"Create Hospital Successfully"})
    } catch (error) {
        next(error)
    }
    
}

exports.adminUpdateHospital = async(req,res,next) =>{
    try {
        const {hospital_id ,contact_info } = req.body
        //update
       const updateHospital =  await prisma.hospital.update({
            where : { hospital_id: hospital_id},
            data: { 
                contact_info:contact_info,
            }
        })
        res.json({
            message: " update hospital successfully",
            data: updateHospital,
        });
    } catch (error) {
        next(error)
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
