import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";

const register = async (req, res) => {
    try{


        const {name , email , password} = req.body;

        const validation = registerSchema.safeParse({name , email , password})
        if(!validation.success){
            return res.status(400).json({message : "Validation error", error : validation.error.errors})
        }


        const IsUserExist = await User.findOne({email})
        if(IsUserExist){
            return res.status(400).json({message : "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({name, email ,  password : hashedPassword})
        const user = await newUser.save()

        const token  = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"})

        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000 
        })


        res.status(201).json({message : "User registered successfully", user})

        


    }catch(err){
        res.status(500).json({message : "Error while registering user", error : err.message})
    }
}


const login = async (req, res) => {

    try {

        const {email , password} = req.body;
   
        const validation = loginSchema.safeParse({email , password})
        if(!validation.success){
            return res.status(400).json({message : "Validation error", error : validation.error.errors})
        }


        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "User does not exist"})
        }


       
   const IsPassword = await bcrypt.compare(password, user.password)


        if(!IsPassword){
            return res.status(400).json({message : "Invalid password"})
        }


        const token  = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : "7d"})


        res.cookie("token", token, {
            httpOnly : true,
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000 
        })



        res.status(200).json({message : "User logged in successfully", user})




       




    }catch(err){
        res.status(500).json({message : "Error while logging in user", error : err.message})
    }
}


const getUser = async (req, res) => {
    try {


        const id = req.user.id


        const IsUserExist = await User.findById(id)
        if(!IsUserExist){
            return res.status(400).json({message : "User does not exist"})
        }


        res.status(200).json({message : "User fetched successfully", user : IsUserExist})




    }catch(err){
        res.status(500).json({message : "Error while getting user", error : err.message})
    }
}




export default {register, login , getUser}