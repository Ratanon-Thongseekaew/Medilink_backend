const createError = require('../utils/createError')
const prisma = require('../configs/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../service/send-mail')

exports.register = async (req, res, next) => {

    try {
        //1.req.body
        const { email, firstname, phone, lastname, password, confirmpassword } = req.body
        //2.validators
        // 3.Check email alredy exist
        const checkEmail = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if (checkEmail) {
            createError(400, "Email is already Exist")
        }

        //4.Encrypt bcryptjs
        const hashedPassword = bcrypt.hashSync(password, 10);

        //5.insert to db
        const users = await prisma.user.create({
            data: {
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                password: hashedPassword,
            }
        })


        res.json({ message: 'Register Success' })
    } catch (error) {

        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        //1. req.body
        const { email, password } = req.body

        //2. check email and password
        const users = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if (!users) {
            createError(400, "Email or Password Is Invalid")
        }

        const passwordMatch = bcrypt.compareSync(password, users.password)

        if (!passwordMatch) {
            createError(400, "Email or Password Is Invalid")
        }
        //3. Grnerate Token
        const payload = {
            id: users.id,
            email: users.email,
            firstname: users.firstname,
            lastname: users.lastname,
            phone: users.phone,
            profile: users.profileImg,
            role: users.role,
        }
        console.log(payload);

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "15d",
        })
        res.json({
            message: "Login Success",
            payload: payload,
            token: token,
        })

        // const sendMail = await sendEmail.doctorAppointment()

        // console.log(sendMail);


    } catch (error) {
        next(error)
    }
}

exports.getme = async (req, res, next) => {
    try {
        const { id } = req.user
        console.log("checkkkk", req.user)
        const users = await prisma.user.findUnique({
            where: {
                id: id,
            },
            omit: {
                password: true
            }
        })
        console.log(users)
        res.json({ result: users });
    } catch (error) {
        next(error);
    }
};