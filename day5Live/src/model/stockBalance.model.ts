import mongoose from "mongoose";



const  stockBalanceSchema = new mongoose.Schema({
     user_id : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        require : true

     },

     market_id : {
        type : mongoose.Types.ObjectId,
        ref : 'market',
        require : true
     },
     side :{
        type :String,
        enum :['yes' , 'no'],
        require : true
     },
     qty : {
        type : Number ,
        require : true
     },
     locked :{
        type : Number,
        require : true
     }
    
},{
    timestamps : true
})


stockBalanceSchema.index(
  { userId: 1, marketId: 1, type: 1 },
  { unique: true }
);






export const StockBalance  = mongoose.model('stockBalance', stockBalanceSchema )