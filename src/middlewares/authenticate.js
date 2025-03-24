const createError = require("../utils/createError");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    //รับ header ที่ส่งมาจาก client
    const authorization = req.headers.authorization;
    console.log(authorization)
console.log('authorization', authorization)
    if (!authorization) {
      return res.status(401).json({ message: "Missing Token" });
    }

    const token = authorization.split(" ")[1];
    console.log("token :>> ", token);
    //verity token ถ้าผ่านจะได้ข้อมูล user ใน decode ออกมา
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      console.log("Decoded token:", decode);
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // console.log(decode)
      //สร้าง property user ให้เท่ากับ decode (ข้อมูล user จาก Token)
      req.user2 = decode;
      req.user = { ...decode, id: decode.id || decode.userId };
      console.log("User set on request:", req.user2);
      next();
    });
  } catch (error) {
    next(error);
  }
};
