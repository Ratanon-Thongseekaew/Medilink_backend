const express = require("express");
const appointmentRouter = express.Router();

//middleware
const {
  userCreateAppointment,
  userGetAppointmentbyId,
  appointmentCheckout,
  appointmentCheckoutStatus,
} = require("../controller/appointment-controller");
const { authenticate } = require("../middlewares/authenticate");

//auth-route
appointmentRouter.post(
  "/create/:doctorId",
  authenticate,
  userCreateAppointment
);

appointmentRouter.get("/:id",authenticate,userGetAppointmentbyId)

appointmentRouter.post("/checkout", authenticate, appointmentCheckout);
appointmentRouter.get("/checkout-status/:session_id",authenticate, appointmentCheckoutStatus)



module.exports = appointmentRouter;
