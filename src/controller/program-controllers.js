const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const cloudinary = require("../configs/cloudinary")
const fs = require("fs")
const path = require("path")

exports.userGetAllPrograms = async (req,res,next)=>{
try {
    const {page = "1", limit = "25"}= req.query;
    if (isNaN(Number(page)) || isNaN(Number(limit))) {
        return next(createError(400, "Invalid type for page or limit"));
    }
    const skip = (Number(page) - 1) * Number(limit);
    
    const getPrograms =  await prisma.program.findMany({
        select:{
            program_id: true,
            name:true,
            description:true,
            price:true,
            createdAt:true,
            updatedAt:true,
            profileImg:true
        },
        orderBy: {
            createdAt: "desc",
        },
        skip: skip,
        take: Number(limit),
    })
    console.log("✅ Fetching all program");
    console.log(getPrograms);
    res.status(200).json({ getPrograms:getPrograms, message: "get programs successfully"});
} catch (error) {
    next(error)
    console.error('Error creating order:', error);
}

}


exports.UserGetProgramDetail = async(req,res,next)=>{
const {program_id:id} = req.params
try {
    if(!id){
        return createError(400, "Program ID Must be provided")
    }
    if(isNaN(Number(id))){
        return createError(400, "Invalid ID")
    }
    const userGetProgram = await prisma.program.findFirst({
        where:{
            id: Number(id)
        },
        select:{
            program_id:true,
            name:true,
            description:true,
            price:true,
            createdAt:true,
            profileImg:true
        }
    })
    res.json({userGetProgram :userGetProgram })
} catch (error) {
    next(error)
}
}

exports.adminCreateProgram = async (req,res,next)=>{
try {
    const {name,description,price,profileImg} = req.body
} catch (error) {
    next(error)
}

}