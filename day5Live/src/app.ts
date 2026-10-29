import express from "express"
import authRoute from '../src/routes/user.route'
const app = express();




app.use(express.json())


app.use('/api/auth' , authRoute)










export default app

