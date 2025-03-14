const express = require("express")
const programRouter = express.Router()
const programController = require("../controller/program-controllers")
const upload = require("../middlewares/upload")
const { authenticate } = require("../middlewares/authenticate")
//get all program
programRouter.get("/all",authenticate,programController.userGetAllPrograms)
programRouter.get("/:id", authenticate,programController.UserGetProgramDetail)
//create
programRouter.post("/create",authenticate, upload.single("profileImg"), programController.adminCreateProgram)


module.exports = programRouter