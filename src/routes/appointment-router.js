const express = require("express");
const appointmentRouter = express.Router();

//middleware
const {
  userCreateAppointment,
  userGetAppointmentbyId,
} = require("../controller/appointment-controller");
const { authenticate } = require("../middlewares/authenticate");

//auth-route
appointmentRouter.post(
  "/create/:doctorId",
  authenticate,
  userCreateAppointment
);

appointmentRouter.get("/:id",authenticate,userGetAppointmentbyId)



module.exports = appointmentRouter;
