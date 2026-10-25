import jwt from 'jsonwebtoken';



async function authMiddleware(req, res, next) {
    try{ 


        const token = req.cookies.token


        if(!token){
            return res.status(401).json({message : "No token provided"})
        }



        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()


    }catch(err){
        res.status(500).json({message : "Error in auth middleware", error : err.message})
    }
}



export default authMiddleware;


