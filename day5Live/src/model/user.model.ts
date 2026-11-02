
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
    lockBalance:{
        type : Number,
        default : 0
    },
    role :{
        type : String,
        enum : ['user','admin'],
        default : 'user'
    }
} , { 
    timestamps : true
})



export const UserModel = mongoose.model('User' , UserScema)








