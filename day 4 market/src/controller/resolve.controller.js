
import mongoose from "mongoose";
import Market from "../model/market.model.js";
import Bet from "../model/bet.model.js";
import wallet from "../model/walletEvent.model.js";
import User from "../model/user.model.js";
import{ resolveMarketSchema} from "../middleware/validate.middleware.js";

export const resolveMarket = async (req, res) => {

    try {

        const id = req.user.id;

        const { marketId, resolution } = req.body;
        
        const result = resolveMarketSchema.safeParse({marketId, resolution});
         
        if(result.error){ 
            return res.status(400).json({message :  result.error.details[0].message})
        }

        if(!mongoose.Types.ObjectId.isValid(marketId)){
            return res.status(400).json({message : "Please provide a valid market id"})
        }


        const market = await Market.findById(marketId);

        if(!market){
            return res.status(400).json({message : "Market not found"})
        }


        if(market.createdBy.toString() !== id){
            return res.status(400).json({message : "You are not authorized to resolve this market"})
        }

        if(market.resolution !== null){
            return res.status(400).json({message : "Market is already resolved"})
        }

        


        const bets = await Bet.find({marketId : marketId});

       const totalBetAmount = bets.reduce((total, bet) => total + bet.betAmount, 0);
        
   
       if(market.resolution === resolution){

        const totalPayout = totalBetAmount * 2 + (market.initialWager - totalBetAmount);


        await User.updateOne({_id : market.createdBy}, {$inc : {amount : totalPayout}});

        await  wallet.create({
            userId : market.createdBy,
            amount : totalPayout,
            tx_type : "payout",
            external_id : marketId
        })

         
            
       }else {

        for(const bet of bets){
            const payout = bet.betAmount * 2;

            await User.updateOne({_id : bet.userId}, {$inc : {amount : payout}});


            await  wallet.create({
                userId : bet.userId,
                amount : payout,
                tx_type : "payout",
                external_id : marketId
            })
        }


        const refundAmount = market.initialWager - totalBetAmount;

         if(refundAmount > 0){
            await User.updateOne({_id : market.createdBy}, {$inc : {amount : refundAmount}});

            await  wallet.create({
                userId : market.createdBy,
                amount : refundAmount,
                tx_type : "refund",
                external_id : marketId
            })
         }

        

       }

       market.resolution = resolution;

       await market.save();

       res.status(200).json({message : "Market resolved successfully" , resolution : resolution})




    }
    catch(error){
        console.log('Error resolving market:', error.message);
        res.status(500).json({ message: "Error resolving market" });
    }

}