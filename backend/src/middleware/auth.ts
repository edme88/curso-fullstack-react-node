import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

process.loadEnvFile()
const JWT_SECRET = process.env.JWT_SECRET!

declare module "express" {
    interface Request{
        userId?: string
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("Validando Usuario")

    // Bearer significa PORTADOR 
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if(!authHeader || !authHeader.startsWith("Bearer") || !token){
        return res.json({ success: false, message: "No Autorizado"})
    }
    console.log(authHeader)

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string}
        req.userId = decoded.userId
        console.log(req.userId)
        next()
    }catch(error: any){
        console.log(error)
        if(error.name === "JsonWebTokenError"){
            res.status(401).json({succcess: false, message: "Clave secreta erronea"})
        }else if(error.name === "TokenExpiredError"){
            res.status(401).json({succcess: false, message: "Token expirado"})
        }else{
            res.status(401).json({succcess: false, message: error})
        }
    }
    
}

export {authMiddleware};