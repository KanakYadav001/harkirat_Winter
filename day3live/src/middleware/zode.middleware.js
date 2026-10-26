import zod from "zod";


const loginScema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const registerSchema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(6, { message: "Password must be at least 6 characters long" }),
});


export default { loginScema, registerSchema };