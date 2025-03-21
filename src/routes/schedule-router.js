const express = require("express");
const scheduleRouter = express.Router();

//middleware
const { authenticate } = require("../middlewares/authenticate");
const {
  getDoctorSchedulesByDoctorIdAndDay,
  getDoctorOvertime,
  getDoctorLeave,
} = require("../controller/schedule-controller");

//auth-route
scheduleRouter.get("/get-doctor-schedule", getDoctorSchedulesByDoctorIdAndDay);
scheduleRouter.get("/get-doctor-overtime", getDoctorOvertime);
scheduleRouter.get("/get-doctor-leave", getDoctorLeave);

module.exports = scheduleRouter;
