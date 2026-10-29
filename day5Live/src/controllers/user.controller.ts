import User from "../model/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose"

import {
  signupSchema,
  signinSchema,
  onrampSchema
} from "../middleware/validation.middleware.ts";


export const signup = async (req : any, res : any) => {
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
        message: "User Already Exits Take Another Name"
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
    console.log(err)
    res.status(501).json({
      message: "some Problem Occure While SignUp",
    });
  }
};

export const signin = async (req : any, res : any) => {
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

    const isPasswordValid = await bcrypt.compare(password ,IsUser.password);

    if (!isPasswordValid) {
      res.status(401).json({
         message : "Invalid Passwrod!"
      })
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
    console.log(err)
    res.status(501).json({
      message: "Error occure while login ",
    });
  }
};

export const addBalance = (req : any, res : any ) => {
  try {
    const {id , amount } = req.body



    const validate = onrampSchema.safeParse({
        amount 
    })

    if(validate.error){
        return res.status(404).json({
            message :""
        })
    }


 if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({
        message : "Invalid Id Please Enter Correct Id"
    })
 }





  } catch (err) {
    res.status
  }
};


