

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

// Routing
const authRouter = require("./src/routes/auth-router")
const doctorRouter = require("./src/routes/doctor-router")
const hospitalRouter = require("./src/routes/hospital-route")
// const userRouter = require("./routes/user-router")
// const handleError = require("./middlewares.js/error")


const app = express()

// Middlewares
app.use(cors()) // Allows cross domain
app.use(morgan("dev")) // Show log terminal
app.use(express.json()) // For read json
const handleError = require('./src/middlewares/handleError')



// // Routing 
app.use('/api/auth',authRouter)
app.use('/api',doctorRouter)
app.use('/api',hospitalRouter)
// app.use('/api',userRouter)

// Handle errors
app.use(handleError)

// Start Server
const PORT = 8888
app.listen(PORT,()=> console.log(`Server is runnig on port ${PORT}`))