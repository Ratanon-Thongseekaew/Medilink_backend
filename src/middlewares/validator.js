
const { z } =require("zod")

exports.registerSchema = z
  .object({
    email: z.string().email("Email ไม่ถูกต้อง"),
    firstname: z.string().min(3, "Firstname ต้องมากกว่า 3 "),
    lastname: z.string().min(3, "Lastname ต้องมากกว่า 3 "),
    password: z.string().min(4, "Password ต้องมากกว่า 4"),
    confirmpassword: z.string().min(4, "Confirm Password ต้องมากกว่า 4"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Confirm Password isn't matching",
    path: ["confirmPassword"],
  });

exports.loginSchema = z.object({
  email: z.string().email("Email ไม่ถูกต้อง"),
  password: z.string().min(4, "Password ต้องมากกว่า 4"),
});

exports.validateWithZod = (schema) => (req, res, next) => {
  try {
    console.log("Hello middleware");
    schema.parse(req.body);
    next();
  } catch (error) {
    const errMsg = error.errors.map((item) => item.message);
    const errTxt = errMsg.join(",");
    const mergeError = new Error(errTxt);
    next(mergeError);
  }
};