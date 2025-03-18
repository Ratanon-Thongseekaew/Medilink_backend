const express = require('express')
const hospitalRouter = express.Router()
const hospitalController = require('../controller/hospital-controller')
const { authenticate } = require('../middlewares/authenticate')
const upload = require('../middlewares/upload')

//done
hospitalRouter.get('/hospital-location', hospitalController.userGetAllHospital)
//done
hospitalRouter.post('/create', upload.single("profileImg"), authenticate,hospitalController.adminCreateHospital)
//doone
hospitalRouter.get('/getAllHospital',authenticate,hospitalController.adminGetAllHospital)
//doone
hospitalRouter.get("/:id", authenticate,hospitalController.adminGetHospital)
//doing
hospitalRouter.patch('/:id', upload.single("profileImg"),authenticate,hospitalController.adminUpdateHospital)
//doing
hospitalRouter.delete('/:id',authenticate,hospitalController.adminDeleteHospital)



module.exports = hospitalRouter