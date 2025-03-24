const PDFDocument = require("pdfkit")
const fs = require("fs")
const image = "https://res.cloudinary.com/dpeegtiv8/image/upload/v1741939571/logo_te6v3y.png"

const generateSchedulePDF = (packageDetails) => {


    const orderDate = new Date(packageDetails?.orderDate);


    const date = orderDate?.toISOString().split('T')[0]; // '2025-03-06'
    const time = orderDate?.toISOString().split('T')[1].slice(0, 5); // '10:55'


    console.log('packageDetailspdf', packageDetails)


    return new Promise((resolve, rejects) => {

        const doc = new PDFDocument({ margin: 50 });


        const filePath = "./src/service/files/schedule.pdf";
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        doc.registerFont("THSarabunNew", "./src/service/fonts/THSarabunNew.ttf");

        doc.image("./src/service/image/logo_te6v3y.png", {
            fit: [100, 100], // ปรับขนาดโลโก้ตามต้องการ
            align: "center", // จัดกึ่งกลาง
          });
        doc.font("THSarabunNew")

        doc.fontSize(22).text("กำหนดการนัดหมายเข้าใช้บริการ", { align: "center" });
        doc.moveDown(1.5);






        const data = [
            { label: "ชื่อผู้เข้ารับบริการ", value: `${packageDetails?.user?.firstname}  ${packageDetails?.user?.lastname}`  || "ไม่ระบุ" },
            { label: "วันที่", value: date || "ไม่ระบุ" },
            { label: "เวลา", value: time || "ไม่ระบุ" },
            { label: "สถานที่", value: "โรงพยาบาลกรุงเทพ" },
            { label: "ชื่อแพ็คเกจ", value: packageDetails?.program?.name || "ไม่ระบุ" },
        ]


        const startX = 50;
        let startY = doc.y
        const cellWidth = 200
        const cellHeight = 30


        doc
            .fontSize(16)
            .text("รายละเอียดการนัดหมาย", startX, startY, { bold: true })

        startY += cellHeight;

        data.forEach((row) => {
            doc
                .rect(startX, startY, cellWidth, cellHeight)
                .stroke()
                .text(row.label, startX + 10, startY + 8);

            doc
                .rect(startX + cellWidth, startY, cellWidth, cellHeight)
                .stroke()
                .text(row.value, startX + cellWidth + 10, startY + 8);

            startY += cellHeight;


        })
        doc.end()

        writeStream.on("finish", () => {

            resolve(filePath)

        })

        writeStream.on("error", (err) => {
            rejects(err)

        })

    })



}

module.exports = generateSchedulePDF






















const generateScheduleDoctorPDF = (packageDetails) => {


    const orderDate = new Date(packageDetails?.orderDate);


    const date = orderDate?.toISOString().split('T')[0]; // '2025-03-06'
    const time = orderDate?.toISOString().split('T')[1].slice(0, 5); // '10:55'


    console.log('packageDetailspdf', packageDetails)


    return new Promise((resolve, rejects) => {

        const doc = new PDFDocument({ margin: 50 });


        const filePath = "./src/service/files/schedule.pdf";
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        doc.registerFont("THSarabunNew", "./src/service/fonts/THSarabunNew.ttf");

        doc.image("./src/service/image/logo_te6v3y.png", {
            fit: [100, 100], // ปรับขนาดโลโก้ตามต้องการ
            align: "center", // จัดกึ่งกลาง
          });
        doc.font("THSarabunNew")

        doc.fontSize(22).text("กำหนดการนัดหมายเข้าใช้บริการ", { align: "center" });
        doc.moveDown(1.5);






        const data = [
            { label: "ชื่อผู้เข้ารับบริการ", value: `${packageDetails?.user?.firstname}  ${packageDetails?.user?.lastname}`  || "ไม่ระบุ" },
            { label: "วันที่", value: date || "ไม่ระบุ" },
            { label: "เวลา", value: time || "ไม่ระบุ" },
            { label: "สถานที่", value: "โรงพยาบาลกรุงเทพ" },
            { label: "ชื่อแพ็คเกจ", value: packageDetails?.program?.name || "ไม่ระบุ" },
        ]


        const startX = 50;
        let startY = doc.y
        const cellWidth = 200
        const cellHeight = 30


        doc
            .fontSize(16)
            .text("รายละเอียดการนัดหมาย", startX, startY, { bold: true })

        startY += cellHeight;

        data.forEach((row) => {
            doc
                .rect(startX, startY, cellWidth, cellHeight)
                .stroke()
                .text(row.label, startX + 10, startY + 8);

            doc
                .rect(startX + cellWidth, startY, cellWidth, cellHeight)
                .stroke()
                .text(row.value, startX + cellWidth + 10, startY + 8);

            startY += cellHeight;


        })
        doc.end()

        writeStream.on("finish", () => {

            resolve(filePath)

        })

        writeStream.on("error", (err) => {
            rejects(err)

        })

    })



}

module.exports = generateScheduleDoctorPDF