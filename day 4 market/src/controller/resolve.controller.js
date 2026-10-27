
import mongoose from "mongoose";


export const resolveMarket = async (req, res) => {
    try {



    }catch(error){
        console.log('Error resolving market:', error.message);
        res.status(500).json({ message: "Error resolving market" });
    }
}