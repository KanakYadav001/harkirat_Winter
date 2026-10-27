import mongoose from 'mongoose';

const marketSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    initialWager : {
        type : Number,
        required : true
    },
    side :{
        type : String,
        required : true,
        enum : ["yes", "no"]
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    expiry : {
        type : Date,
        required : true,
    },
   resolution : {
        type : String,
        enum : ["yes", "no", "null"],
        default : null
    }

}, {
timestamps : true
})

const Market = mongoose.model("Market", marketSchema);

export default Market;