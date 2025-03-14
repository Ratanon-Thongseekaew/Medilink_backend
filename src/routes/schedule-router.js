const express = require("express");
const scheduleRouter = express.Router();

//middleware
const { authenticate } = require("../middlewares/authenticate");
const { getDoctorScheduleByID } = require("../controller/schedule-controller");

//auth-route
scheduleRouter.get("/get-doctor-schedule", authenticate, getDoctorScheduleByID);

module.exports = scheduleRouter;
