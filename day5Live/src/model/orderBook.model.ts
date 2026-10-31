import mongoose from 'mongoose'

const orderBookSchema  = new mongoose.Schema({

    marketId :{
        type : mongoose.Types.ObjectId ,
        ref : "market",
        required : true
    } ,
    stockSide : {
        type : String,
        enum : ["yes" , "no"],
        require : true,
    }

}, {

    timestamps : true
});

orderBookSchema.index(
      {marketId : 1 , type : 1},
      {unique : true}
)

export const orderBook = mongoose.model('orderBook' , orderBookSchema)