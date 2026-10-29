
import mongoose from "mongoose"



const UserScema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true
    },
    password : {
         type : String,
        require : true,
        unique : true
    },
    balance :{
        type : Number,
        default : 0
    },
    investBalance:{
        type : Number,
        default : 0
    }
} , { 
    timestamps : true
})



const UserModel = mongoose.model('User' , UserScema)




export default UserModel



