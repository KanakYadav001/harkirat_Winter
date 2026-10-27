import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const {email , password } = req.body;
    

    const user = await User.findOne({email : email});

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



  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while adding funds" })
  }
}

export const getUserDetails = async (req, res) => {
  try {




  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while getting user details" })
  }
}


export const getTransaction= async (req, res) => {
  try {
    
    



  }catch (error) {
    console.log(error)
    res.status(500).json({ message: "error while getting transaction" })
  }
}