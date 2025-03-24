const transporter = require("../configs/mail");
const generateScheduleDoctorPDF = require("./generate-pdf");
const generateSchedulePDF = require("./generate-pdf");
const image = "https://res.cloudinary.com/dpeegtiv8/image/upload/v1741939571/logo_te6v3y.png"
const sendEmail = {};

sendEmail.doctorAppointment = async (recipientEmail, appointmentDetails) => {

  try {

    const pdfPath = await generateScheduleDoctorPDF(appointmentDetails)


    const info = await transporter.sendMail({

      from: process.env.GMAIL,
      to: "thongnit2201@gmail.com",
      subject: "Medilink ขอบพระคุณที่ไว้วางใจใช้บริการของเรา",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; 
                    font-family: Arial, sans-serif; background-color: #f4f8fb; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="${image}" width="200" alt="โรงพยาบาล">
            <h2 style="color: #2c3e50;">กำหนดการนัดหมายแพทย์</h2>
          </div>

          <!-- Card Content -->
          <div style="background-color: white; padding: 20px; border-radius: 10px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
              เรียนคุณ <strong>${appointmentDetails?.patientName}</strong>,
            </p>
            <p style="font-size: 14px; color: #555;">
              ทางโรงพยาบาลขอแจ้งรายละเอียดการนัดหมายแพทย์ของคุณ:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="padding: 8px; background-color: #e9f5ff;"><strong>📅 วันที่</strong></td>
                <td style="padding: 8px;">${appointmentDetails?.date}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background-color: #e9f5ff;"><strong>⏰ เวลา</strong></td>
                <td style="padding: 8px;">${appointmentDetails?.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background-color: #e9f5ff;"><strong>🏥 สถานที่</strong></td>
                <td style="padding: 8px;">${appointmentDetails?.location}</td>
              </tr>
              <tr>
                <td style="padding: 8px; background-color: #e9f5ff;"><strong>👨‍⚕️ แพทย์</strong></td>
                <td style="padding: 8px;">${appointmentDetails?.doctor}</td>
              </tr>
            </table>

            <p style="font-size: 14px; color: #555; margin-top: 15px;">
              กรุณามาถึงก่อนเวลา 15 นาที หากมีข้อสงสัยสามารถติดต่อ <a href="tel:+6621234567">02-123-4567</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
            <p>ขอขอบคุณที่ไว้วางใจใช้บริการของเรา 💙</p>
            <p>&copy; 2025 โรงพยาบาลกรุงเทพ</p>
          </div>

        </div>
      `,
      attachments: [
        {
          filename: "schedule.pdf",
          path: pdfPath,
          contentType: "application/pdf",

        },
      ],
    })
    console.log("Message sent: %s", info.messageId);

    return info
  } catch (error) {

    console.error("Error sending email", error);

    throw error

  }



}











sendEmail.PurchasePackage = async (packageDetails, recipientEmail) => {

  try {

    console.log('packageDetails', packageDetails)

    const pdfPath = await generateSchedulePDF(packageDetails)


    const orderDate = new Date(packageDetails?.orderDate);


    const date = orderDate?.toISOString().split('T')[0]; // '2025-03-06'
    const time = orderDate?.toISOString().split('T')[1].slice(0, 5); // '10:55'






    const info = await transporter.sendMail({

      from: process.env.GMAIL,
      to: process.env.SENDTOEMAIL,
      subject: "Medilink ขอบพระคุณที่ไว้วางใจใช้บริการของเรา",
      html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; 
                  font-family: Arial, sans-serif; background-color: #f4f8fb; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px;">
          <img src="${image}" width="200" alt="โรงพยาบาล">
          <h2 style="color: #2c3e50;">กำหนดการเข้าใช้บริการ</h2>
        </div>

        <!-- Card Content -->
        <div style="background-color: white; padding: 20px; border-radius: 10px;">
          <p style="font-size: 16px; color: #333; margin-bottom: 10px;">
            เรียนคุณ <strong>${packageDetails?.user?.firstname} ${packageDetails?.user?.lastname}</strong>,
          </p>
          <p style="font-size: 14px; color: #555;">
            ทางโรงพยาบาลขอแจ้งรายละเอียดการนัดหมายเข้าใช้บริการของคุณ:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; background-color: #e9f5ff;"><strong>📅 วันที่</strong></td>
              <td style="padding: 8px;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #e9f5ff;"><strong>⏰ เวลา</strong></td>
              <td style="padding: 8px;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #e9f5ff;"><strong>🏥 สถานที่</strong></td>
              <td style="padding: 8px;">โรงพยาบาลกรุงเทพ</td>
            </tr>
            <tr>
              <td style="padding: 8px; background-color: #e9f5ff;"><strong>👨‍⚕️ แพ็คเกจ</strong></td>
              <td style="padding: 8px;">${packageDetails?.program?.name}</td>
            </tr>
          </table>

          <p style="font-size: 14px; color: #555; margin-top: 15px;">
            กรุณามาถึงก่อนเวลา 15 นาที หากมีข้อสงสัยสามารถติดต่อ <a href="tel:+6621234567">02-123-4567</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
          <p>ขอขอบคุณที่ไว้วางใจใช้บริการของเรา 💙</p>
          <p>&copy; 2025 โรงพยาบาลกรุงเทพ</p>
        </div>

      </div>
    `,
      attachments: [
        {
          filename: "schedule.pdf",
          path: pdfPath,
          contentType: "application/pdf",

        },
      ],
    })
    console.log("Message sent: %s", info.messageId);

    return info
  } catch (error) {

    console.error("Error sending email", error);

    throw error

  }



}

module.exports = sendEmail