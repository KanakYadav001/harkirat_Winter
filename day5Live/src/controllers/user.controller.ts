import {UserModel} from "../model/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import type { Request, Response } from 'express';
import {
  signupSchema,
  signinSchema,
  onrampSchema,
} from "../middleware/validation.middleware.ts";
import { wallet } from "../model/walletEvent.model.ts";

export const  authController = {

signup : async (req: Request, res: Response) => {
  try {
    const { username, password  } = req.body;

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

    const IsUser = await UserModel.findOne({
      username,
    });

    if (IsUser) {
      return res.status(404).json({
        message: "User Already Exits Take Another Name",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      password: hashpassword,
    });

    const token = jwt.sign({ _id: user.id , role : user.role }, process.env.JWT_TOKEN, {
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
},

 signin : async (req: Request, res: Response) => {
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

    const IsUser = await UserModel.findOne({
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
},

 addBalance : async (req: Request, res: Response) => {
  try {
    const id = req.user._id
    const {amount}  = req.body

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

    const isUser = await UserModel.findOne({
      _id: id,
    });

    if (!isUser) {
      return res.status(404).json({
        message: "User Not Find Enter Correct User Id",
      });
    }

    isUser.balance += amount;

    await isUser.save();



    await wallet.create({
      userId  : id,
      type : 'onramp',
      amount  : amount
    })

    res.status(200).json({
      message: "Balance Sucessfull Added",
    });
  } catch (err) {
    res.status;
  }
},

 getProfile : async (req: Request, res: Response) => {
  try {
    const id = req.user._id;

    const isUser = await UserModel.findOne({
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
},


getBalance : async (req : Request ,res : Response)=>{
  try{

    const id = req.user._id ;


    const user = await UserModel.findOne({
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
},


getAllTransaction : async (req : Request , res : Response) =>{
  try {

    const id  = req.user._id

    const allTransaction  = await wallet.find({
         userId : id
    }).lean()


    if(allTransaction.length == 0 ){
       return res.status(403).json({
        message  : "No history present"
       })
    }



    res.status(200).json({
      message  :"All transaction Fetch Sucessfully",
      allTransaction
    })

  }catch(err){
    res.status(501).json({
      message : "Error while fetch all the transaction"
    })
  }
}

}

