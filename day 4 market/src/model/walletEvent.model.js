import mongoose from 'mongoose';

const walletScema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    tx_type :{
        type : String,
        enum : ["onramp" , "created" , "bet" , "payout" , "refund"],
        required : true
    },
    external_id : {
        type : mongoose.Schema.Types.Mixed
    },
    amount : {
        type : Number,
        required : true
    },

}, {timestamps : true})



const wallet = mongoose.model("Wallet", walletScema);

export default wallet;