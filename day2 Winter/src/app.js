import express from 'express'
import authRouter from './routes/auth.router.js'
import cookieParser from 'cookie-parser'
import workspaceRouter from './routes/workspace.route.js'
import taskRouter from './routes/task.route.js'


const app = express()



app.use(express.json())

app.use(cookieParser())


app.use("/api/auth",authRouter)
app.use("/api/workspace",workspaceRouter)
app.use("/api/task",taskRouter)





export default app



