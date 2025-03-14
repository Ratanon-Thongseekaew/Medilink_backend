const express = require('express')
const hospitalRouter = express.Router()
const hospitalController = require('../controller/hospital-controller')
const { authenticate } = require('../middlewares/authenticate')


hospitalRouter.post('/createHospital', authenticate,hospitalController.adminCreateHospital)
hospitalRouter.get('/getAllHospital',authenticate,hospitalController.adminGetAllHospital)
hospitalRouter.patch('/updateHospital',authenticate,hospitalController.adminUpdateHospital)
hospitalRouter.delete('/deleteHospital',authenticate,hospitalController.adminDeleteHospital)

module.exports = hospitalRouter