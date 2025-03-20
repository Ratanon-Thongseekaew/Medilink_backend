const express = require('express')
const userController = require('../controller/user-controller')
const upload = require('../middlewares/upload')
const { authenticate } = require('../middlewares/authenticate')
const permission = require('../middlewares/permission')

const userRouter = express.Router()


userRouter.post('/',authenticate,permission,upload.single('profileImg'),userController.adminCreateUsers)
userRouter.get('/',authenticate,permission,userController.adminGetUsers)
userRouter.get('/:id',authenticate,permission,userController.adminGetUserById)
userRouter.delete('/:id',authenticate,permission,userController.adminDeleteUsers)
userRouter.patch('/:id',authenticate,permission,upload.single('profileImg'),userController.adminUpdateUsers)


module.exports = userRouter