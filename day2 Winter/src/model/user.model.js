import mongoose from "mongoose";

const userScema = new mongoose.Schema({
     
    username : {type:String, required:true},
    password : {type:String, required:true},
    
});

const userModel = mongoose.model("user", userScema);

export default userModel;
