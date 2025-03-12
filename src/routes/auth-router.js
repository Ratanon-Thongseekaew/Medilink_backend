const express =require('express')
const authRouter = express.Router()
const authController = require('../controller/auth-controller')
const {validateWithZod, registerSchema, loginSchema} =require('../middlewares/validator')

//middleware
const {authenticate} = require('../middlewares/authenticate')

//auth-route
authRouter.post("/register", validateWithZod(registerSchema),authController.register)
authRouter.post("/login",validateWithZod(loginSchema),authController.login)
authRouter.get('/getme',authenticate,authController.getme)



module.exports = authRouter