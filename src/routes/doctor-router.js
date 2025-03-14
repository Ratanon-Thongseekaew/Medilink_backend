const express = require("express");
const doctorRouter = express.Router();

//middleware
const { authenticate } = require("../middlewares/authenticate");
const {
  getDoctordatas,
  getDoctordatasbySpecialty,
} = require("../controller/doctor-controller");

//auth-route
doctorRouter.get("/get-doctor-datas", getDoctordatas);
doctorRouter.get("/get-doctor-datas-by-specialty", getDoctordatasbySpecialty);

module.exports = doctorRouter;
