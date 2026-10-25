import mongoose from "mongoose";


async function connectDB() {
    try{


        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database connected successfully")


    }catch(err){
       res.status(500).json({message : "Error while connecting to database"})
    }
}


export default connectDB;