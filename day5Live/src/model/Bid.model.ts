import mongoose from "mongoose";


const bidSchema = new mongoose.Schema(
  {
    orderBookId: {
      type: mongoose.Types.ObjectId,
      ref: "orderBook",
      require: true,
    },

    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
    
    price: {
      type: Number,
      require: true,
    },
   
    qty: {
      type: Number,
      require: true,
    },
   stockSide: {
        type : String ,
        enum : ['yes' , 'no'],
        require : true
    },
  },
  {
    timestamps: true,
  },
);


bidSchema.index({
  orderbookId: 1,
  stockType: 1,
  price: -1,
  createdAt: 1,
});

export const Bid = mongoose.model("BID", bidSchema);
