const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {

        user: process.env.GMAIL,
        pass: process.env.GPASS,
    },

});

module.exports = transporter