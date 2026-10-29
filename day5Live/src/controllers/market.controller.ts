import { Month, Split } from './../../node_modules/mongoose/types/expressions.d';

import {  Market } from "../model/market.model";
import UserModel from "../model/user.model";
import { createMarketSchema } from "../middleware/validation.middleware";

export const createMarket = async (req: any, res: any) => {
  try {
    const id = req.user._id;

    const { title, totalIssued, expiry } = req.body;

    const validate = createMarketSchema.safeParse({
      title,
      totalIssued,
      expiry
    });

    if (validate.error) {
      return res.status(401).json({
        message: "Zod validation Not full fill ",
        error: validate.error.message,
      });
    }

    const [date , month  , year] = expiry.split('/').map(Number)


    const fromatDate = new Date( Date.UTC(year , month-1 , date))


    if(fromatDate < new Date()){
        return res.status(401).json({
            message : "this Date is past , use future date "
        })
    }


    const market  = await Market.create({
         creatorId : id,
         title : title,
         totalIssued : totalIssued,
         expiry : fromatDate
    })


    res.status(201).json({
        message : "Market Create Sucessfully",
        market : market
    })
  } catch (err) {
    console.log(err)
    res.status(401).json({
      message: "Erorr while creating the market",
    });
  }
};



export const getMarkrt = async (req : any ,res : any ) => {
try {

    const market = await Market.find().sort({ createdAt: -1 }).lean()


    res.status(200).json({
        message : "All Market Fetch Sucessfully",
        market : market
    })


}catch(err){
    res.status(401).json({
        message : "Error in during fetch Markrt"
    })
}
}