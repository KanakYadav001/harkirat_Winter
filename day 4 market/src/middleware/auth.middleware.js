import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }


    try{
        const decoded = jwt.verify(token , process.env.JWT_TOKEN);

        req.user = decoded;

        next();

       

    }catch(error){
        console.log('Error in auth middleware:', error.message);
        return res.status(401).json({message : "Unauthorized"})
    }
}