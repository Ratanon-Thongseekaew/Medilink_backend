const express = require("express");
const aiRouter = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const prisma = require("../configs/prisma");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);




aiRouter.post("/ask", async (req, res,next) => {
    try {
        const { question } = req.body;

        // 🔹 ดึงข้อมูลหมอและแพ็กเกจสุขภาพจากฐานข้อมูล
        const doctors = await prisma.doctor.findMany({
            include: { specialty: true, hospital: true },
        });
        const healthPackages = await prisma.program.findMany();

        // 🔹 แปลงข้อมูลหมอเป็นข้อความที่ AI เข้าใจง่าย
        const healthDoctorText = doctors.map(doc =>
            `ไอดี:${doc.id}   ชื่อ: ${doc.firstname} ${doc.lastname}, เชี่ยวชาญ: ${doc.specialty?.specialtyName}, โรงพยาบาล: ${doc.hospital?.name}
            รูปภาพ:${doc.profileImg}`
        ).join("\n");

        const healthPackagesText = healthPackages.map(pkg =>
            `ไอดี:${pkg.id} ชื่อแพ็กเกจ: ${pkg.name}, ราคา: ${pkg.price} บาท, รายละเอียด: ${pkg.description} รูปภาพ:${pkg.profileImg}`
        ).join("\n");


        // 🔹 Prompt ให้ AI เลือกแพทย์และแพ็กเกจที่เหมาะสม
        const prompt = `
        ### รายชื่อหมอจากเว็บไซต์ของเรา:
        ${healthDoctorText}
        
        ### รายชื่อแพ็คเกจสุขภาพจากเว็บไซต์ของเรา:
        ${healthPackagesText}
        
        ### คำถามจากผู้ใช้:
        "${question}"  ต้องการหมอ 6 คนที่เกี่ยวข้อกับโรคและอาการที่สุด ถึงไม่มียังไงก็ต้องมี 6 คน ขอให้ใกล้เคียงที่สุดห้ามตอบน้อยกว่า 6 คน
        และ ต้องการแพ็กเกจ 6 แพ็กเกจที่เกี่ยวข้อกับโรคและอาการที่สุด ถึงไม่มียังไงก็ต้องมี 6 แพ็กเกจ ขอให้ใกล้เคียงที่สุดห้ามตอบน้อยกว่า 6 แพ็กเกจ
ขอข้อมูลจาก จากเว็บไซต์ของเรา เท่านั้น


        ### คำตอบที่ต้องการ:
        โปรดตอบเป็น JSON **เท่านั้น** โดยไม่มีข้อความอื่นๆ  
        
        {
    "doctors": [
        {
            "id":"1",
            "firstname": "สมชาย",
            "lastname": "ใจดี",
            "specialty": "อายุรศาสตร์หัวใจ",
            "hospital": "โรงพยาบาลกรุงเทพ",
            "profileImg": "https://example.com/doctor1.jpg"
        },
        {
            "id":"2",
            "firstname": "ทวีศักดิ์",
            "lastname": "ทองดี",
            "specialty": "ศัลยกรรมกระดูก",
            "hospital": "โรงพยาบาลรามาธิบดี",
            "profileImg": "https://example.com/doctor2.jpg"
        }
    ],
    "packages": [
    {
    "id":"1",
        "name": "แพ็กเกจตรวจสุขภาพหัวใจ",
        "price": "5000",
        "description": "ตรวจสุขภาพหัวใจ คัดกรองโรคหัวใจและหลอดเลือดเบื้องต้น",
        "profileImg": "https://example.com/package1.jpg"
    },{
    "id":"2",
    "name": "แพ็กเกจตรวจสุขภาพตา",
        "price": "5000",
        "description": "ตรวจสุขภาพหัวใจ คัดกรองโรคหัวใจและหลอดเลือดเบื้องต้น",
        "profileImg": "https://example.com/package2.jpg"
    
    }]
        `;

        console.log('prompt', prompt);

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const result = await model.generateContent(prompt);
        let responseText = await result.response.text();

        console.log('Raw AI response:', responseText);

        // 🔹 ใช้ regex ลบ ```json และ ```
        responseText = responseText.replace(/```json|```/g, "").trim();

        // 🔹 แปลง JSON
        let responseJson;
        try {
            responseJson = JSON.parse(responseText);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            return res.status(500).json({ error: "AI ตอบกลับในรูปแบบที่ไม่ถูกต้อง" });
        }

        res.json({ reply: responseJson });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
    }
});




aiRouter.post("/chat", async (req, res,next) => {
    try {
        const { symptom, duration, underlyingCondition, currentAddress } = req.body;
        console.log('req.body', req.body);

        // 🔹 สร้าง Prompt สำหรับ AI
        // และพักอาศัยอยู่ที่ "${currentAddress}"
        const prompt = `
ผู้ป่วยมาด้วยอาการ "${symptom}" เป็นมาแล้ว "${duration}" วัน  
มีโรคประจำตัว "${underlyingCondition}"   

กรุณาให้คำตอบเป็นข้อๆ และแบ่งออกเป็น 3 หมวดหมู่  
แต่ละข้อควร **สั้นกระชับ** (ไม่เกิน 1 บรรทัด) และมี **5-6 ข้อ** ต่อหมวดหมู่  

### วิเคราะห์อาการของคุณเบื้องต้น  
1.  
2.  
3.  
4.  
5.  
ในหมวดหมู่ วิเคราะห์อาการของคุณเบื้องต้น ข้อให้เป็นคำตอบแต่ วิเคราะห์อาการของคุณเบื้องต้น และอาการที่น่าจะเป็น
**ห้าม** วิเคราะห์ปัจจัยที่ไม่เกี่ยวกับโรค  
### วิธีดูแลเบื้องต้น  
1.  
2.  
3.  
4.  
5.  

### เมื่อไรควรไปพบแพทย์  
1.  
2.  
3.  
4.  
5.  

**โปรดตอบในรูปแบบเดียวกับที่กำหนดนี้ และใช้เครื่องหมาย "###" เพื่อแยกแต่ละหมวดหมู่**
`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Response from /chat1:', text);

        // 🔹 เรียก API /ask โดยใช้คำตอบจาก /chat1
        const askResponse = await fetch("http://localhost:8888/api/ai/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: text }),
        });

        const askData = await askResponse.json();

        // 🔹 ส่งคำตอบจาก API /ask กลับไปที่ผู้ใช้
        res.json({ chatReply: text, askReply: askData.reply });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});







module.exports = aiRouter;