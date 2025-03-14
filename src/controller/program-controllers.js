const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const cloudinary = require("../configs/cloudinary")
const fs = require("fs")
const path = require("path");
const { connect } = require("http2");

//done
exports.userGetAllPrograms = async (req,res,next)=>{
try {
    const {page = "1", limit = "25"}= req.query;
    if (isNaN(Number(page)) || isNaN(Number(limit))) {
        return next(createError(400, "Invalid type for page or limit"));
    }
    const skip = (Number(page) - 1) * Number(limit);
    
    const getPrograms =  await prisma.program.findMany({
        select:{
            id: true,
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

//done
exports.UserGetProgramDetail = async(req,res,next)=>{
const {id} = req.params
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
            id:true,
            name:true,
            description:true,
            price:true,
            createdAt:true,
            profileImg:true
        }
    })
    if (!userGetProgram) {
        return next(createError(404, "Program not found"));
      }
    res.json({userGetProgram :userGetProgram })
} catch (error) {
    next(error)
}
}
// done 
exports.adminCreateProgram = async (req,res,next)=>{
try {
    const {name,description,price,profileImg} = req.body
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    if(!req.user || req.user.role !== "ADMIN"){
        return createError(403,"Unauthorized")
    }
    //upload รูปภาพ
    let imageUrl = "";
    if(req.file){
        const uploadResponse = await cloudinary.uploader.upload(req.file.path,{
            folder: "mediLink_program",
        });
        imageUrl = uploadResponse.secure_url;
    }
    const newProgram = await prisma.program.create({
        data:{
            name:name,
            description:description,
            price:price,
            profileImg:imageUrl,
        },
    })
    res.json({
        message: "Create New Program Successfully",
        program:newProgram});
} catch (error) {
    next(error)
}
}


exports.adminUpdateProgram = async (req,res,next)=>{
try {
    
} catch (error) {
    
}


}

// exports.adminDeleteProgram = async (req,res,next) =>{

// }


