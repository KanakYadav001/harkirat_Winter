import {  Market } from "../model/market.model";
import { orderBook } from "../model/orderBook.model";
import {UserModel} from "../model/user.model";
import mongoose from "mongoose";
import { Ask } from "../model/Ask.model.ts";
import { Bid } from "../model/Bid.model";
import { Fill } from "../model/Fill.model.ts";
import { StockBalance } from "../model/stockBalance.model.ts";
import { wallet } from "../model/walletEvent.model.ts";
import {Request , Response} from 'express'
import { createMarketSchema } from "../middleware/validation.middleware.ts";


export const marketController = {

 createMarket : async (req: Request, res: Response) => {
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

     await orderBook.create([{
          marketId : market._id,
          stockSide : "yes"
     },{
           marketId : market._id,
          stockSide : "no"
     }])


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
},
 getMarkrt : async (req : Request ,res : Response ) => {
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
},
 createOrder : async (req:Request , res:Response) => {
  
  try {

    const id = req.user._id;
    const {marketId , side, type , qty , amount }  = req.body;


    if(!mongoose.Types.ObjectId.isValid(marketId)){
      return res.status(401).json({
        message : "Market id not valid "
      })
    }

    const market = await marketId.findOne({
      _id : marketId
    })

    if(!market || market.resolution !=null){
      return res.status(401).json({
        message : "Invalid Market Id or Maket Already Resolve"
      })
    }

    const user = await UserModel.findOne({
      _id : id
    })

    if(!user){
      return res.status(401).json({
        message : "User Not Found"
      })
    }
    const OrderBook = await orderBook.findOne({
      _id : marketId, 
      stockSide : side
    })

    if(!OrderBook){
      return res.status(401).json({
        message : "Order Book Not found in this market"
      })
    }

    
    const remaningQty = qty ;
    const Filled  = 0 ;
    const pendingOrder = null
   


    if(type=="buy"){
      

       const totalAmount = amount*qty;
      if( user.balance < totalAmount){
        return res.status(401).json({
          message : "Inefficient balance"
        })
      }
      

      user.balance -=totalAmount;
      user.lockBalance +=totalAmount


      await user.save()

      

      const askTrades = await Ask.find({
         orderBookId : OrderBook._id,
         userId : {$ne : id},
         type : type,
         side : side,
         price : {$lte : amount }


      })



      for(const ask of askTrades){
          if(remaningQty == 0) break

          

          const matchQty = Math.min(
            remaningQty,
            ask.qty
          )



          const exePrice = ask.price;
          const actualCost = exePrice * matchQty;


          const reserverForMatch = amount * matchQty
          const refund = actualCost  - reserverForMatch ;


          const seller = await UserModel.findOne({
            _id : ask.userId
          })


          const sellStock = await StockBalance.findOne({
            userId : ask.userId,
            market_id : marketId,
            side : side
          })

          if(!seller || !sellStock || sellStock.locked < matchQty || sellStock.qty <matchQty ){
            res.status(401).json({
              message : "Seller OR sellStock notfound or inefficient balance"
            })
          }

          user.lockBalance -= reserverForMatch


          user.balance +=refund

          seller.balance +=actualCost


          sellStock.qty -= matchQty;
          sellStock.locked -= matchQty




         await user.save();
         await sellStock.save()
         await seller.save()



         await StockBalance.findOneAndUpdate({
            user._id,
            marketId,
            side,
            matchQty

            
         },{

          $inc : {qty : matchQty},
          $setOnInsert :{
            locked : 0
          },



         },{

        upsert : true,
        new : true,
        runValidators : true



         })



         await Fill.create([
           {

            orderBookId : orderbook._id,


           },{




           }
         ])










      }


    }else{







    }



    res.status(201).json({
      message : "Order execute Sucessfully"
    })
  }catch(err){
    res.status(501).josn({
      message : "error While Creating Order"
    })
  }


},
getOrderBook  : async (req:Request, res :Response) =>{
  try {

    const{ marketId ,  stockSide }= req.params


    if(!mongoose.Types.ObjectId.isValid(marketId)){
      return res.status(401).json({
         message : "Invalid marketId"
      })
    }

    const isMarket = await Market.findOne({
      _id : marketId
    })

    if(!isMarket){
    return res.status(401).json({
      message : "market Not found!!"
    })
    }

    
    const allBid = await Bid.find({marketId : marketId ,   stockSide : stockSide }).sort({price : -1 , createdAt : 1}).lean()
    const allAsk = await Ask.find({marketId : marketId ,  stockSide :  stockSide }).sort({price : 1 , createdAt : 1}).lean()


    res.status(200).json({
      message : "Order Book Fetch Sucessfully",
      buyers : allBid,
      gap : "''''''''''''''''''''''''''''",
      gap2 : "''''''''''''''''''''''''''''",
      gap3 : "''''''''''''''''''''''''''''",
      gap4 : "''''''''''''''''''''''''''''",
      sellers : allAsk
    })



  


  }catch(err){
    return res.status(501).json({
      message : "Some Problem Occur While GetOrder Books"
    })
  }
}

}

