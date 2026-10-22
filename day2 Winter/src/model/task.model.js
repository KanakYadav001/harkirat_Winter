import mongoose from "mongoose";


const taskScema = new mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    completed : {type:Boolean, default:false},
    workspace : {
        type : mongoose.Schema.Types.ObjectId, 
         ref  : "workspace",
          required:true
        },

    dueDate : {type:Date, required:true},
} , {
timestamps:true
})


const taskModel = mongoose.model("task", taskScema);

export default taskModel;