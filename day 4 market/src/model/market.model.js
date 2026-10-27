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
    slide :{
        type : String,
        required : true,
        enum : ["Yes", "No"]
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    expiresAt : {
        type : Date,
        required : true,
    },
    resoluction : {
        type : String,
        enum : ["Yes", "No", "null"],
        default : null
    }

}, {
timestamps : true
})

const Market = mongoose.model("Market", marketSchema);

export default Market;