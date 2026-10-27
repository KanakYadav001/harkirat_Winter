import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import wallet from '../model/walletEvent.model.js';
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  try{

    const {username  , password } = req.body;


    if(!username || !password){
        return res.status(400).json({message : "Please fill all the fields"})
    }


    const IsUserExist = await User.findOne({username : username });


    if(IsUserExist){
        return res.status(400).json({message : "User already exist"})
    }



    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = new User({
        username : username,
        password : hashedPassword
    })


    await newUser.save();


    const token = jwt.sign({id : newUser._id} , process.env.JWT_TOKEN , {expiresIn : "7d"});

    res.cookie("token" , token , {
        httpOnly : true,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
    })


    res.status(201).json({message : "User registered successfully"})


  }catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try{
    const {username , password } = req.body;
    

    const user = await User.findOne({username : username});

    if(!user){
        return res.status(400).json({message : "User not found"})
    }


    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(400).json({message : "Invalid password"})
    }


    const token = jwt.sign({id : user._id} , process.env.JWT_TOKEN , {expiresIn : "7d"});

    res.cookie("token" , token , {
        httpOnly : true,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
    })


    res.status(200).json({message : "User logged in successfully"})




    
  }catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const addFunds = async (req, res) => {
  try {

    const {id , amount} = req.body;

    if(!id || !amount){
        return res.status(400).json({message : "Please provide user id and amount"})
    }

    if(amount <= 0){
        return res.status(400).json({message : "Amount should be greater than 0"})
    }


    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message : "Invalid user id"})
    }

    const user = await User.findById(id );

    if(!user){
        return res.status(400).json({message : "User not found"})
    }

    const newWalletEvent = new wallet({
        userId : id,
        amount : amount,
        tx_type : "onramp",
        date : new Date()
    })

    await newWalletEvent.save();

    user.amount += amount;

    await user.save();

    res.status(200).json({message : "Funds added successfully"})


  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while adding funds" })
  }
}

export const getUserDetails = async (req, res) => {
  try {

    const id = req.user.id;

    const user = await User.findById(id);

    if(!user){
        return res.status(400).json({message : "User not found"})
    }


    res.status(200).json({user : user})







  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while getting user details" })
  }
}


export const getTransaction= async (req, res) => {
  try {
    
    const id = req.user.id;

    

    const transactions = await wallet.find({userId : id}).sort({date : -1});

    res.status(200).json({transactions : transactions})
    
    



  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while getting transaction" })
  }
}