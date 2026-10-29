import express from "express"
import { signup, signin} from "../controllers/user.controller.ts"

const authRoute = express.Router();




authRoute.post('/signup' , signup);

authRoute.post('/signin' , signin);




export default authRoute














