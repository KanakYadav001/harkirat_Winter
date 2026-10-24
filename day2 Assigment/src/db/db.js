import mongoose from "mongoose";


async function connectDB(){

    try {

        await mongoose.connect(process.env.DB_URI)


        console.log("Database connected successfully");



    }catch (error) {
        console.log(error);

    }


}


export default connectDB;