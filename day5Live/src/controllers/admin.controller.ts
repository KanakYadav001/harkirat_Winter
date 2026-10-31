import mongoose  from "mongoose"
import {UserModel} from "../model/user.model"
import { Ask } from "../model/Ask.model"


export const resolveMarket = (req : any ,res : any)=>{
    try {

        const {marketId , side} = req.body


       if(!mongoose.Types.ObjectId.isValid(marketId)){
        return res.status(401).json({
            message : ""
        })
       }





    }catch(err){
        res.status(501).json({
           message : "Some problem Occure While Resolve The Market "
        })
    }
}