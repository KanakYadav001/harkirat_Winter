import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import zod from "zod";


const registerValidation = zod.object({
    username : zod.string().min(3).max(20),
    password : zod.string().min(6).max(20)
})

const loginValidation = zod.object({
    username : zod.string().min(3).max(20),
    password : zod.string().min(6).max(20)
})




const registerUser = async (req,res)=>{
 
    try {

        const {username,password} = req.body;

        const validate = registerValidation.safeParse({username,password});


        if(!validate.success){
            return res.status(400).json({message:validate.error.issues[0].message})
        }


        const hashedPassword = await bcrypt.hash(password,10);

        const user = await userModel.findOne({username});
        if(user){
            return res.status(400).json({message:"User Already Exist"})
        }



        const newUser =  await userModel.create({username,password : hashedPassword});
        


        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});



        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge:7*24*60*60*1000  
        })



        


        res.status(201).json({message:"User Created Successfully",token})


        






    }catch (error) {
        res.status(500).json({message:error.message})
    }

}

const loginUser = async (req,res)=>{

try {
    const {username,password} = req.body;

    const validate = loginValidation.safeParse({username,password});

    if(!validate.success){
        return res.status(400).json({message:validate.error.issues[0].message})
    }

    const user = await userModel.findOne({username});

    if(!user){
        return res.status(400).json({message:"Invalid Credentials"})
    }


    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Credentials"})
    }



    const token = jwt.sign({id : user._id},process.env.JWT_SECRET,{expiresIn:"7d"});



    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000  
    })


    res.status(200).json({message:"Login Successful",token})

}catch (error) {
    res.status(500).json({message:error.message})
}
    

}

const getUser = async (req,res)=>{

    try {

const userId = req.user;
const {id } = req.params;


if(!id){
    return res.status(400).json({message:"User Id is Required"})
}

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"Invalid User Id"})
}


const User = await userModel.findById(id);

if(!User){
    return res.status(404).json({message:"User Not Found"})


}


if(User._id.toString() !== userId){
    return res.status(403).json({message:"You are not authorized to access this user"})
}



res.status(200).json({message:"User Found",user:User})

    }catch (error) {
        res.status(500).json({message:error.message})
    }
    

}




export default {registerUser,loginUser,getUser}