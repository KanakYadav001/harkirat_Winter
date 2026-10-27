import User from "../model/user.model.js";
import Market from "../model/market.model.js";
import Bet from "../model/bet.model.js";
import mongoose from "mongoose";
import wallet from "../model/walletEvent.model.js";
import { createMarketSchema  ,  placeBetSchema } from "../middleware/validate.middleware.js";

export const createMarket = async (req, res) => {
  try {
    const id = req.user.id;
    const { title, initialWager, side, expiry } = req.body;


    const result  = createMarketSchema.safeParse({
       title, initialWager, side, expiry
    })

    if(result.error){
     return res.status(404).json({
        error : result.error  })
    }

    if (!title || !initialWager || !side || !expiry) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }



    const [date, month, year] = expiry.split("/").map(Number);
    const formatDate = new Date(Date.UTC(year, month - 1, date));


    if (formatDate <= new Date()) {
      return res.status(400).json({ message: "Please provide a valid date" });
    }

    const newMarket = new Market({
      title: title,
      initialWager: initialWager,
      side: side,
      createdBy: id,
      expiry: formatDate,
    });

    newMarket.save();

    res
      .status(200)
      .json({ message: "Market created successfully", market: newMarket });
  } catch (error) {
    console.log("Error creating market:", error);
    res.status(500).json({ message: "Error creating market" });
  }
};

export const getAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find().sort({ createdAt: -1 });

    res.status(200).json({ markets: markets });
  } catch (error) {
    console.log("Error fetching markets:", error.message);
    res.status(500).json({ message: "Error fetching markets" });
  }
};

export const betMarket = async (req, res) => {
  try {
    const id = req.user.id;

    const { betAmount, marketId } = req.body;

    const validate = placeBetSchema.validate({
       marketId, betAmount
    })

    if(validate.error){
      return res.status().json({
        error : validate.error.message
      })
    }

    if (!betAmount || !marketId) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    if (betAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid bet amount" });
    }

    if (!mongoose.Types.ObjectId.isValid(marketId)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid market id" });
    }

    const market = await Market.findById(marketId);

    if (!market) {
      return res.status(400).json({ message: "Market not found" });
    }

    if (market.resolution !== null) {
      return res
        .status(400)
        .json({ message: "Market is already resolved you cannot place bet" });
    }
    if (market.expiry <= new Date()) {
      return res
        .status(400)
        .json({ message: "Market is expired you cannot place bet" });
    }

    if (market.createdBy.toString() === id) {
      return res
        .status(400)
        .json({ message: "You cannot place bet on your own market" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.amount < betAmount) {
      return res
        .status(400)
        .json({ message: "Insufficient funds add some funds to place bet" });
    }


    const existingBet = await Bet.find({marketId: marketId });
      
    const totalBetAmount = existingBet.reduce((total, bet) => total + bet.betAmount, 0);

    if (totalBetAmount + betAmount > market.initialWager) {
      return res.status(400).json({ message: "Total bet amount exceeds the initial wager for this market" });
    }
      

    const walletEvent = new wallet({
      userId: id,
      amount: -betAmount,
      tx_type: "bet",
      external_id: marketId,
    });

    const newBet = new Bet({
      userId: id,
      marketId: marketId,
      betAmount: betAmount,
    });

    user.amount -= betAmount;

     await newBet.save();
    await user.save();
    await walletEvent.save();

    res.status(200).json({ message: "Bet placed successfully", bet: newBet });
  }
  catch (error) {
    console.log("Error placing bet:", error.message);
    res.status(500).json({ message: "Error placing bet" });
  }
};

export const getBetsMarket = async (req, res) => {
  try {
    const id = req.user.id;

    const bets = await Bet.find({ userId: id }).sort({ createdAt: -1 });

    if (!bets) {
      return res.status(400).json({ message: "No bets found" });
    }

    res.status(200).json({ bets: bets });
  } catch (err) {
    console.log("Error fetching bets:", err.message);
    res.status(500).json({ message: "Error fetching bets" });
  }
};
