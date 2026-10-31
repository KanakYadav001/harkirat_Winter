import express from 'express'
import {resolveMarket} from '../controllers/admin.controller'
import { authMiddleware } from '../middleware/auth.middleware'
const adminRoute = express.Router()



adminRoute.post('/resolve' , authMiddleware , resolveMarket)



export default adminRoute



