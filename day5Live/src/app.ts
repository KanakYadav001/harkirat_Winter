import express from "express"
import authRoute from '../src/routes/user.route'
import markrtRoute from '../src/routes/market.route'
import cookiParser from 'cookie-parser'
import adminRoute from "./routes/admin.route"

const app = express();

app.use(express.json())
app.use(cookiParser())


app.use('/api' , authRoute)
app.use('/api/market' , markrtRoute)
app.use('/api/admin' , adminRoute)







export default app

