const express = require("express");
const orderRouter =express.Router();
const orderController = require("../controller/order-controller");
const { authenticate } = require("../middlewares/authenticate");

// Package and Program
orderRouter.post("/create/:programId",authenticate,orderController.userCreateOrder)
orderRouter.patch("/:orderId",authenticate,orderController.userUpdateOrder)
orderRouter.get("/allOrder",authenticate,orderController.adminGetAllOrder)
orderRouter.get("/:orderId",authenticate,orderController.userGetOrderById)

// Appointment
orderRouter.post("/create-appointment/:appointmentId",authenticate,orderController.userCreateAppointmentOrder)

module.exports = orderRouter