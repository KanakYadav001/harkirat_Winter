import mongoose  from "mongoose"
import {UserModel} from "../model/user.model"
import type { Request  , Response } from 'express'
import { StockBalance} from '../model/stockBalance.model'
import { Market } from "../model/market.model"
import { wallet } from "../model/walletEvent.model"


export const adminController = {
 
 resolveMarket : async (req : Request ,res : Response)=>{
    try {
     

        const id = req.user._id
       

      

        const {marketId , side} = req.body


       if(!mongoose.Types.ObjectId.isValid(marketId)){
        return res.status(401).json({
            message : "invalid Market Id"
        })
       }


       const market = await Market.findOne({
        _id : marketId
       })


       if(!market || market.resolution !==null){
        return res.status(401).json({
           message : "Market Already Resolve"
        })
       }



        const AllStocks = await StockBalance.find({
            market_id : marketId,
        })


        const winningSide = AllStocks.filter((item) => item.side === side)

        const looseSide = AllStocks.filter((item) => item.side !== side)



        const adminUser = await UserModel.findOne({
            _id : id
        })


        if(!adminUser){
            return res.status(201).json({
               message: "Admin user not found"
            })
        }
      



       if(side == "yes"){

         market.resolution = 'yes'
           await  market.save()
        



        for(const stock  of winningSide){

            const user = await UserModel.findOne({
                _id : stock.user_id
            })


            if(!user){
                 return res.status(401).json({
                    message : "User Not Found"
                 })
            }


            const totalQuantity = stock.qty


            const totalAmountOfStock = market.totalIssued * totalQuantity

    
            const profit  = totalAmountOfStock* 2

            adminUser.balance -=profit
            user.balance += profit 


           await user.save()
           await adminUser.save()

            await wallet.create({
                userId : user ,
                amount : profit, 
                type : 'payout'
            })

        }

        for(const loose of looseSide){

                  const user = await UserModel.findOne({
                _id : loose.user_id
            })


            if(!user){
                 return res.json(401).json({
                    message : "User Not Found"
                 })
            }

            const totalQuantity = loose.qty


            const totalAmountOfStock = market.totalIssued * totalQuantity


            adminUser.balance += totalAmountOfStock


            await adminUser.save()

            
          await wallet.create({
            userId : loose.user_id,
            amount : -totalAmountOfStock,
            type : 'payout'
          })

        }

       }else {

        market.resolution = 'no'
        await  market.save()


        for(const stock  of winningSide){

            const user = await UserModel.findOne({
                _id : stock.user_id
            })


            if(!user){
                 return res.json(401).json({
                    message : "User Not Found"
                 })
            }


            const totalQuantity = stock.qty 


            const totalAmountOfStock = market.totalIssued * totalQuantity

    
            const profit  = totalAmountOfStock* 2

            adminUser.balance -=profit
            user.balance += profit 


           await user.save()
           await adminUser.save()

            await wallet.create({
                userId : stock.user_id ,
                amount : profit, 
                type : 'payout'
            })

        }

        for(const loose of looseSide){

                  const user = await UserModel.findOne({
                _id : loose.user_id
            })


            if(!user){
                 return res.status(401).json({
                    message : "User Not Found"
                 })
            }

            const totalQuantity = loose.qty 


            const totalAmountOfStock =  totalQuantity  * market.totalIssued 


            adminUser.balance += totalAmountOfStock


            await adminUser.save()

            
          await wallet.create({
            userId : loose.user_id,
            amount : -totalAmountOfStock,
            type : 'payout'
          })

        }


       }

       res.status(200).json({
         message : "Market Resolve Sucessfully"
       })


    }catch(err){
        res.status(501).json({
           message : "Some problem Occure While Resolve The Market "
        })
    }
}

}