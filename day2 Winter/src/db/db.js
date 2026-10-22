

import mongoose from 'mongoose'



async function ConnectToDb(){
    try{

        await mongoose.connect(process.env.DB_URI)
        console.log("DB Connect Sucessfull");
        

    }catch(err){
   
        console.log("Error While Connect to db ");
        
        console.log(err);

        
    

    }
}

export default ConnectToDb