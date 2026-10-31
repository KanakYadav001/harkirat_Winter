
import mongoose from "mongoose";


const askSchema = new mongoose.Schema(
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
        enum : ['Yes' , 'No'],
        require : true
    },
  },
  {
    timestamps: true,
  },
);

askSchema.index({
   orderbookId: 1,
  stockType: 1,
  price: 1,
  createdAt: 1,
})

export const Ask = mongoose.model("Ask", askSchema);
