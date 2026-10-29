import mongoose from "mongoose";

async function ConnectToDB(req, res) {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("DB Connect Sucessfully");
  } catch (err) {
    res.status(400).json({
      message: "Problem in Connect To DB",
    });
  }
}

export default ConnectToDB;
