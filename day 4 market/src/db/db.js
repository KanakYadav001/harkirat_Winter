import mongoose from 'mongoose';


const connectDB = async (req, res) => {
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected Sucessfully');

    }catch (error) {
      console.error('MongoDB connection failed:', error.message);
    }
}



export default connectDB;

