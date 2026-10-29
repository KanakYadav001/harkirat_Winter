
import express from 'express'

import  { getMarkrt  , createMarket} from '../controllers/market.controller'

import  { authMiddleware } from '../middleware/auth.middleware'




const marketRoute = express.Router()



marketRoute.post('/', authMiddleware , createMarket )


marketRoute.get('/', getMarkrt )




export default marketRoute
