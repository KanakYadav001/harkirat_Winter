import mongoose  from "mongoose";


const modelScema = new mongoose.Schema({
    name : {type:String, required:true},
    userId : {

        type : mongoose.Schema.Types.ObjectId, 
         ref  : "User",
          required:true
        },
     

});




const workSpaceModel = mongoose.model("workspace", modelScema);


export default workSpaceModel;
