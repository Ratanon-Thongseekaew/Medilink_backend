const express = require("express");
const appointmentRouter = express.Router();

//middleware
const { authenticate } = require("../middlewares/authenticate");
const {
  userCreateAppointment,
} = require("../controller/appointment-controller");

//auth-route
appointmentRouter.post("/create", authenticate, userCreateAppointment);

module.exports = appointmentRouter;
