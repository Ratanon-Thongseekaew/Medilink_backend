const path = require("path")
const multer = require("multer")


// console.log(__dirname)

const storage = multer.diskStorage({
    destination:(req,file,callback) =>callback(null,path.join(__dirname, "../../upload-pic")),
    filename: (req,file,callback) =>{
        console.log(file.originalname)
        console.log(path.extname(file.originalname))
        let fileExt = path.extname(file.originalname)
        callback(null,`pic_${Date.now()}${Math.round(Math.random()*100)}${fileExt}`)
    }
})

module.exports = (multer({storage: storage}))