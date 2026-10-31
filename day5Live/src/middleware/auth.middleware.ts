import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { Request, Response } from "express";
import adminRoute from "../routes/admin.route";


export const Middleware = {



  authMiddleware: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_TOKEN);

      req.user = decode;

      next();
    } catch (err) {
      res.status(401).json({
        message: "Umauthorized User !!!",
      });
    }
  },



  adminMiddleware : async ( req : Request , res : Response , next : NextFunction) =>{


      const token = req.cookies.token;

       if (!token) {
      return res.status(401).json({
        message: "token not found",
      });
    }

    if(token.role !== 'admin'){
       return res.status(401).json({
        message : "Only Admin User Use This!!!"
       })
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_TOKEN);

      req.user = decode;

      next();
    } catch (err) {
      res.status(401).json({
        message: "Umauthorized User !!!",
      });
    }
  }


  
};
