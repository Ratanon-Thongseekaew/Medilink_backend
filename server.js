require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./src/routes/auth-router");
const doctorRouter = require("./src/routes/doctor-router");
const hospitalRouter = require("./src/routes/hospital-route");
const programRouter = require("./src/routes/program-router");
const userRouter = require("./src/routes/user-router");
const appointmentRouter = require("./src/routes/appointment-router");
const scheduleRouter = require("./src/routes/schedule-router");
const handleError = require("./src/middlewares/handleError");

const app = express();

// Middlewares
app.use(cors()); // Allows cross domain
app.use(morgan("dev")); // Show log terminal
app.use(express.json()); // For read json

// // Routing
app.use("/api/auth", authRouter);
app.use("/api/hospital", hospitalRouter);
app.use("/api/program", programRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
// app.use('/api',userRouter)

// Handle errors
app.use(handleError);

// Start Server
const PORT = 8888;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
