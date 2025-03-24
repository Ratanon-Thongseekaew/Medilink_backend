const createError = require('../utils/createError')
const prisma = require('../configs/prisma')
const cloudinary = require('../configs/cloudinary')
const path = require('path')
const fs = require('fs/promises')
const bcrypt = require('bcryptjs')

module.exports.adminCreateUsers = async (req, res, next) => {

    try {

        const { email, password, firstname, lastname, phone, address, role } = req.body

        console.log('req.body', req.body)

        const profileImg = req.file

        const haveFile = !!req.file

        let uploadResult = {}

        if (haveFile) {

            uploadResult = await cloudinary.uploader.upload(req.file.path, {


                overwrite: true,
                public_id: path.parse(req.file.path).name


            })

            fs.unlink(req.file.path)

        }


        if (!email || !password || !firstname || !lastname || !phone || !role) {
            createError(400, "All required fields must be provided.")
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            createError(400, "Invalid email format.")
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            createError(400, "Phone number must be 10 digits long.")
        }


        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            createError(400, "Email already exists.")
        }



        const newUser = await prisma.user.create({

            data: {


                email,
                password: await bcrypt.hash(password, 10),
                firstname,
                lastname,
                phone,
                address,
                role,
                profileImg: uploadResult.secure_url || ''


            }


        })



        res.status(201).json({ message: 'User created successfully', User: newUser })

    } catch (error) {

        next(error)


    }





}


module.exports.adminGetUsers = async (req, res, next) => {


    try {
        const getUser = await prisma.user.findMany({

        })

        res.status(201).json({ message: "success", getUser })
    } catch (error) {
        next(error)
    }



}


module.exports.adminDeleteUsers = async (req, res, next) => {

    try {
        const { id } = req.params

        if (!id) {

            createError(400, 'require id parameter')
        }

        if (isNaN(id)) {

            createError(400, "Invalid user Id. Must be a number.")

        }

        const userData = await prisma.user.findUnique({
            where: { id: +id }
        })


        const result = await prisma.user.delete({ where: { id: +id } })


        res.json({ message: `Delete user id=${id} done`, deletePost: userData })


    } catch (error) {
        next(error)
    }



}






module.exports.adminUpdateUsers = async (req, res, next) => {

    try {
        const { id } = req.params

        if (!id) {

            createError(400, 'require id parameter')
        }


        if (isNaN(id)) {

            createError(400, "Invalid user Id. Must be a number.")

        }



        const { email, firstname, lastname, phone, address, role } = req.body

        const userData = await prisma.user.findUnique({ where: { id: +id } })

        if (!userData) {

            createError(400, 'Cannot edit this post')


        }

        const haveFile = !!req.file

        if (haveFile) {
            uploadResult = await cloudinary.uploader.upload(req.file.path, {

                overwrite: true,
                public_id: path.parse(req.file.path).name

            })
            fs.unlink(req.file.path)

        }

        let data = haveFile
            ? {
                email,
                firstname,
                lastname,
                phone,
                address,
                role,
                profileImg: uploadResult.secure_url || ''
            }
            : {
                email,
                firstname,
                lastname,
                phone,
                address,
                role,
                profileImg: userData.profileImg || ''
            }

        const result = await prisma.user.update({

            where: { id: +id },
            data

        })
        res.json({ message: 'Update User Success', result })
    } catch (error) {
        next(error)
    }





}




module.exports.adminGetUserById = async (req, res, next) => {


    try {

        const { id } = req.params

        if (!id) {

            createError(400, "Require id parameter")

        }


        const user = await prisma.user.findUnique({


            where: { id: +id }


        })


        if (!user) {

            createError(404, "User not found")

        }

        res.status(200).json({ message: "Success", user })

    } catch (error) {
        next(error)
    }



}