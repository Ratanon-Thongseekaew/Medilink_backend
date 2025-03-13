const createError = require("../utils/createError")

module.exports = async (req,res,next)=>{
try {
    
console.log('req.user', req.user)
const {role} = req.user

if(role!=='ADMIN'){

    createError(401,'Unauthorized access')
}
next()

} catch (error) {
    next(error)
}


}