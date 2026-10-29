import mongoose from "mongoose";

const marketScema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  totalIssued: {
    type: Number,
    require: true,
  },
  resolution : {
    type : String,
    enum : ['yes' , 'no'],
    default : 'no'
  },
  expiry : {
    type : Date,
  },
}, {
    timestamps : true
});

export const Market = mongoose.model("market", marketScema);
