import mongoose from "mongoose"


const FillSchema = new mongoose.Schema({
    orderBookId :{
        type : mongoose.Types.ObjectId,
        ref : "orderBook",
        require : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
    },
    price : {
        type : Number ,
        require : true
    },
    qty : {
        type : Number ,
        require : true
    },
    type : {
        type : String,
        enum : ['sell','buy'],
        require : true
    },
    isMaker : {
        type : Boolean,
        require : true
    }
},{
    timestamps : true
})




export const Fill  = mongoose.model('FILL',FillSchema)