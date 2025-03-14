

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config();

// Routing
const authRouter = require("./src/routes/auth-router")
const programRouter = require("./src/routes/program-router")
const userRouter = require("./src/routes/user-router");


const app = express();

// Middlewares
app.use(cors()); // Allows cross domain
app.use(morgan("dev")); // Show log terminal
app.use(express.json()); // For read json
const handleError = require("./src/middlewares/handleError");
const appointmentRouter = require("./src/routes/appointment-router");


// // Routing
app.use("/api/program",programRouter)
app.use("/api/auth", authRouter);
app.use("/api/appointment", appointmentRouter);

app.use("/api/user", userRouter);
// app.use('/api',userRouter)

// Handle errors
app.use(handleError);

// Start Server
const PORT = 8888;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
