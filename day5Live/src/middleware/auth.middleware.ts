import jwt from "jsonwebtoken";
import { NextFunction } from "express";

export const authMiddleware = async (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status().json({
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
};
