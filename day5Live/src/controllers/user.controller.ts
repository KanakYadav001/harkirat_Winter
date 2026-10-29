import User from "../model/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import {
  signupSchema,
  signinSchema,
  onrampSchema,
} from "../middleware/validation.middleware.ts";

export const signup = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    const validate = signupSchema.safeParse({
      username,
      password,
    });

    if (validate.error) {
      return res.status(401).json({
        message: "error in zod validation ",
        error: validate.error.message,
      });
    }

    const IsUser = await User.findOne({
      username,
    });

    if (IsUser) {
      return res.status(404).json({
        message: "User Already Exits Take Another Name",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashpassword,
    });

    const token = jwt.sign({ _id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Register Sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(501).json({
      message: "some Problem Occure While SignUp",
    });
  }
};

export const signin = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    const validate = signinSchema.safeParse({
      username,
      password,
    });

    if (validate.error) {
      return res.status(401).json({
        message: "error in zod validation ",
        error: validate.error.message,
      });
    }

    const IsUser = await User.findOne({
      username,
    });

    if (!IsUser) {
      return res.status(404).json({
        message: "User Not Exits!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, IsUser.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid Passwrod!",
      });
    }

    const token = jwt.sign({ _id: IsUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Login Sucessfully",
    });
  } catch (err) {
    console.log(err);
    res.status(501).json({
      message: "Error occure while login ",
    });
  }
};

export const addBalance = async (req: any, res: any) => {
  try {
    const { id, amount } = req.body;

    const validate = onrampSchema.safeParse({
      amount,
    });

    if (validate.error) {
      return res.status(404).json({
        message: "Zod invalid error",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Invalid Id Please Enter Correct Id",
      });
    }

    const isUser = await User.findOne({
      _id: id,
    });

    if (!isUser) {
      return res.status(404).josn({
        message: "User Not Find Enter Correct User Id",
      });
    }

    isUser.balance += amount;

    await isUser.save();

    res.status(200).json({
      message: "Balance Sucessfull Added",
    });
  } catch (err) {
    res.status;
  }
};

export const getProfile = async (req: any, res: any) => {
  try {
    const id = req.user._id;

    const isUser = await User.findOne({
      _id: id,
    }).lean();

    if (!isUser) {
      return res.status(404).json({
        message: "User Not found!!",
      });
    }

    res.status(200).json({
      message: "User Fetch Sucessfully",
      user: isUser,
    });
  } catch (err) {
    res.status(501).json({
      message: "Some error occure while fetching File",
    });
  }
};


export const getBalance = async (req : any ,res : any)=>{
  try{

    const id = req.user._id ;


    const user = await User.findOne({
      _id : id
    })

    if(!user){
        return res.status(401).json({
            message : "User not found!!"
        })
    }

   const balance = user.balance ;


    res.status(200).json({
        Balance : balance
    })


  }catch(err){
     res.status(501).json({
            message : "some problem occure while fetch the balance"
        
     })
  }
}