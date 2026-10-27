import User from '../model/user.model.js';
import Market from '../model/market.model.js';
import Bet from '../model/bet.model.js';



export const createMarket = async (req, res) => {
    try {



    }catch(error){
        console.log('Error creating market:', error.message);
       res.status(500).json({ message: "Error creating market" });
    }


}


export const  getAllMarkets = async (req, res) => {
    try {

    }catch(error){
        console.log('Error fetching markets:', error.message);
        res.status(500).json({ message: "Error fetching markets" });
    }
}


export const betMarket = async (req, res) => {
    try {





    }catch(error){
        console.log('Error placing bet:', error.message);
        res.status(500).json({ message: "Error placing bet" });
    }
}



export const getBetsMarket = async (req, res) => {
   try {




   }catch(err){
    console.log('Error fetching bets:', err.message);
     res.status(500).json({ message: "Error fetching bets" });
   }
}


