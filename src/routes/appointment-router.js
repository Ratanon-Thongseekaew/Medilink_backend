const express = require("express");
const appointmentRouter = express.Router();

//middleware
const {
  userCreateAppointment,
} = require("../controller/appointment-controller");
const { authenticate } = require("../middlewares/authenticate");

//auth-route
appointmentRouter.post(
  "/create/:doctorId",
  authenticate,
  userCreateAppointment
);

module.exports = appointmentRouter;
