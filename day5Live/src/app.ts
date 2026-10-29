import express from "express"
import authRoute from '../src/routes/user.route'
import markrtRoute from '../src/routes/market.route'
import cookiParser from 'cookie-parser'


const app = express();

app.use(express.json())
app.use(cookiParser())


app.use('/api' , authRoute)

app.use('/api/market' , markrtRoute)










export default app

