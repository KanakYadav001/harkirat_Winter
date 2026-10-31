
import express from 'express'

import  { getMarkrt  , createMarket , createOrder  , getOrderBook } from '../controllers/market.controller'

import  { authMiddleware } from '../middleware/auth.middleware'




const marketRoute = express.Router()



marketRoute.post('/', authMiddleware , createMarket )
marketRoute.get('/', getMarkrt )
marketRoute.post('/createOrder', authMiddleware ,createOrder )
marketRoute.get('/orderBook' ,getOrderBook )





export default marketRoute
