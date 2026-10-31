import mongoose from 'mongoose';

const walletScema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    type :{
        type : String,
        enum : ["onramp" , "bet" , "payout" , "refund"],
        required : true
    },
    amount : {
        type : Number,
        required : true
    },

}, {timestamps : true})



export const wallet = mongoose.model("Wallet", walletScema);

