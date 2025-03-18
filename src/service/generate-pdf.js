const PDFDocument = require("pdfkit")
const fs = require("fs")


const generateSchedulePDF = (appointmentDetails) => {

    return new Promise((resolve, rejects) => {

        const doc = new PDFDocument({ margin: 50 });


        const filePath = "./src/service/files/schedule.pdf";
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        doc.registerFont("THSarabunNew", "./src/service/fonts/THSarabunNew.ttf");


        doc.font("THSarabunNew")

        doc.fontSize(22).text("กำหนดการนัดหมายแพทย์", { align: "center" });
        doc.moveDown(1.5);


        const data = [
            { label: "ชื่อผู้ป่วย", value: appointmentDetails?.patientName || "ไม่ระบุ" },
            { label: "วันที่", value: appointmentDetails?.date || "ไม่ระบุ" },
            { label: "เวลา", value: appointmentDetails?.time || "ไม่ระบุ" },
            { label: "สถานที่", value: appointmentDetails?.location || "ไม่ระบุ" },
            { label: "แพทย์ที่รับผิดชอบ", value: appointmentDetails?.doctor || "ไม่ระบุ" },
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