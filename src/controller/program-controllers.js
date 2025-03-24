const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const stripe = require('stripe')('sk_test_51R3rIn2MGjRxxELSU6HwntWTt0QWTD4Hb6hNI6hebWgcG7xo19WeZUH0Qirt2uoaFHEwFid5A99ba5AP98YTGrIO00PbfuDfgr');

const cloudinary = require("../configs/cloudinary");
const fs = require("fs");
const path = require("path");
const { connect } = require("http2");

//done
exports.userGetAllPrograms = async (req, res, next) => {
  try {
    const { page = "1", limit = "25" } = req.query;
    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      return next(createError(400, "Invalid type for page or limit"));
    }
    const skip = (Number(page) - 1) * Number(limit);

    const getPrograms = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        updatedAt: true,
        profileImg: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip,
      take: Number(limit),
    });
    console.log("✅ Fetching all program");
    console.log(getPrograms);
    res
      .status(200)
      .json({ getPrograms: getPrograms, message: "get programs successfully" });
  } catch (error) {
    next(error);
    console.error("Error creating order:", error);
  }
};

//done
exports.UserGetProgramDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return createError(400, "Program ID Must be provided");
    }
    if (isNaN(Number(id))) {
      return createError(400, "Invalid ID");
    }
    const userGetProgram = await prisma.program.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        profileImg: true,
      },
    });
    if (!userGetProgram) {
      return next(createError(404, "Program not found"));
    }
    res.json({ userGetProgram: userGetProgram });
  } catch (error) {
    next(error);
  }
};
// done
exports.adminCreateProgram = async (req, res, next) => {
  try {
    const { name, description, price, profileImg } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    if (!req.user || req.user.role !== "ADMIN") {
      return createError(403, "Unauthorized");
    }
    //upload รูปภาพ
    let imageUrl = "";
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "mediLink_program",
      });
      imageUrl = uploadResponse.secure_url;
    }
    const newProgram = await prisma.program.create({
      data: {
        name: name,
        description: description,
        //insert parsefloat
        price:  parseFloat(price),
        profileImg: imageUrl,
      },
    });
    res.json({
      message: "Create New Program Successfully",
      program: newProgram,
    });
  } catch (error) {
    next(error);
  }
};

//done
exports.adminUpdateProgram = async (req, res, next) => {
  try {
    const {  id } = req.params;
    console.log("this is programID check:", id);
    const { name, description, price} = req.body;

    let profileImgPath = undefined;
    if(req.file){
        profileImgPath = req.file.path; 
        console.log("Uploaded file:", req.file);
    }
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    if (!req.user || req.user.role !== "ADMIN") {
      return createError(403, "Unauthorized");
    }
    if (!id) {
      return createError(400, "Program ID must be provided");
    }
    if (isNaN(Number(id))) {
      return createError(400, "Invalid ID");
    }
    const program = await prisma.program.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id:true,
        name: true,
        description: true,
        price: true,
        profileImg: true,
      },
    });
    if (!program) {
      return createError(400, "Program is not found");
    }

    const updateData = {
        name: name,
        description: description,
        //insert parsefloat
        price:  parseFloat(price),
      };
      
      if (profileImgPath) {
        updateData.profileImg = profileImgPath;
      }
      const updatedProgram = await prisma.program.update({
        where: {
          id: Number(id),
        },
        data: updateData
      });
    return res.status(201).json({
        message: "Update Successfully",
        updatedProgram: updatedProgram,
      });
  } catch (error) {
    next(error)
  }
};

//doing
exports.adminDeleteProgram = async (req,res,next)=>{
try {
    const {id} = req.params
    console.log("adminDelete check ID",id);
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
      }
      if (req.user.role !== "ADMIN") {
        return createError(403, "Unauthorized");
      }
      if (!id) {
        return createError(400, "Program ID must be provided");
      }
      if (isNaN(Number(id))) {
        return createError(400, "Invalid ID");
      }
      const program = await prisma.program.findFirst({
        where: {
          id: Number(id),
        },
        select: {
          id:true,
          name: true,
          description: true,
          price: true,
          profileImg: true,
        },
      });
      if (!program) {
        return createError(400, "Program is not found");
      }
      const deleteProgram  = await prisma.program.delete({
        where:{
            id: program.id
        }
      })
      return res.status(200).json({
        message: "delete Successfully",
        deleteProgram: deleteProgram,
      });
} catch (error) {
    next(error)
}
}

exports.checkout = async(req,res,next)=>{
  try {
    const {id} = req.body
    //step 1 find program
    const program = await prisma.program.findFirst({
      where:{
        id:Number(id)
      },
      include:{
        program:{
          select:{
            id:true,
            name:true,
            price:true,
            profileImg:true
          }
        }
      }
    })
    if(!program){
      return createError(404, "Program is not found")
    }
    const {name,price, profileImg} = program
    console.log(name,price, profileImg);
    //step2: Stripe
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          quantity: 1,
          price_data:{
            currency: 'thb',
            product_data:{
               name:name,
               images:[profileImg],
               description: 'Thank You for Purchase!'
            },
            unit_amount: price*100
          }
        },
      ],
      mode: 'payment',
      return_url: `http://localhost:5173/user/checkout{CHECKOUT_SESSION_ID}`,
    });
  
    res.send({clientSecret: session.client_secret});
  } catch (error) {
    next(error)
  }
}

exports.checkoutStatus = async (req,res,next)=>{
try {
   // code
   const { session_id } = req.params;
   const session = await stripe.checkout.sessions.retrieve(session_id);
   const PaymentId = session.metadata?.PaymentId;
   // Check
   if (session.status !== "complete" || !PaymentId) {
     return renderError(400, "Something Wrong!!!!");
   }
   // Update DB paymentStatus => true
   const result = await prisma.payment.update({
     where: {
       id: Number(PaymentId),
     },
     data: {
       status: true,
     },
   });

   res.json({ message: "Payment Complete", status: session.status });
} catch (error) {
  next(error)
}

}
