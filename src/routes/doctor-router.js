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

// const express = require('express')
// const doctorRouter = express.Router()
// const doctorController = require('../controller/doctor-controller')
// const { authenticate } = require('../middlewares/authenticate')

// doctorRouter.get('/listDoctors',authenticate,doctorController.adminGetAllDoctors)
// doctorRouter.post('/createDoctor',authenticate,doctorController.adminCreateDoctor)
// doctorRouter.patch('/updateDoctor',authenticate,doctorController.adminUpdateDoctor)
// doctorRouter.delete('/deleteDoctor',authenticate,doctorController.adminDeleteDoctor)
// doctorRouter.post('/createSpecialty',authenticate,doctorController.adminCreateSpecialty)
// doctorRouter.post('/createLocation',authenticate,doctorController.adminCreateLocation)

// module.exports = doctorRouter
