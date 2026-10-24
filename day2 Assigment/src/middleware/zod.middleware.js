
import zod from "zod";


const todoValidScema = zod.object({
    title: zod.string().min(3, { message: "Title must be at least 3 characters long" }) . max(50, { message: "Title must be at most 50 characters long" }),
    description: zod.string().min(5, { message: "Description must be at least 5 characters long" }).max(200, { message: "Description must be at most 200 characters long" }),
    completed: zod.boolean().optional(),
});



export default todoValidScema;







