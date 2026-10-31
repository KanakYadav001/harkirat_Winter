import mongoose  from "mongoose"
import {UserModel} from "../model/user.model"
import { Ask } from "../model/Ask.model"
import { Request  , Response } from 'express'


export const adminController = {
 
 resolveMarket : (req : Request ,res : Response)=>{
    try {
     
       



        const {marketId , side} = req.body


       if(!mongoose.Types.ObjectId.isValid(marketId)){
        return res.status(401).json({
            message : "invalid Market Id"
        })
       }





    }catch(err){
        res.status(501).json({
           message : "Some problem Occure While Resolve The Market "
        })
    }
}

}