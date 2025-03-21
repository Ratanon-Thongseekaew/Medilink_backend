const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controller/doctor-controller");
//middleware
const { authenticate } = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
// const {
//   getDoctordatasbySpecialty,
//   getDoctorDataById,
//   getAllDoctordatas,
//   getDoctordatasbyHospital,
// } = require("../controller/doctor-controller");

// //auth-route
// doctorRouter.get("/get-all-doctor-datas", getAllDoctordatas);
// doctorRouter.get(
//   "/get-doctor-datas-by-specialty/:specialtyId",
//   getDoctordatasbySpecialty
// );
// doctorRouter.get(
//   "/get-doctor-datas-by-hospital/:hospitalId",
//   getDoctordatasbyHospital
// );
// doctorRouter.get("/get-doctor-data-by-id/:doctorId", getDoctorDataById);

//auth-route
doctorRouter.get(
  "/alldoctors",
  authenticate,
  doctorController.adminGetAllDoctors
);
doctorRouter.get(
  "/specialization",
  authenticate,
  doctorController.adminGetDoctorbySpecialty
);
doctorRouter.get("/:id", authenticate, doctorController.adminGetDoctorById);
doctorRouter.post(
  "/create",
  upload.single("profileImg"),
  authenticate,
  doctorController.adminCreateDoctor
);
doctorRouter.patch(
  "/update/:id",
  upload.single("profileImg"),
  authenticate,
  doctorController.adminUpdateDoctor
);
doctorRouter.delete("/:id", authenticate, doctorController.adminDeleteDoctor);
doctorRouter.post(
  "/specialization/create",
  authenticate,
  doctorController.adminCreateSpecialization
);
doctorRouter.get(
  "/specialization/all",
  authenticate,
  doctorController.adminGetAllSpecialization
);
// doctorRouter.get("/get-doctor-data-by-id/:doctorId", );

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
