import { Request, Response } from "express"
import { userSchema } from "../validators/UserShemaValidator"
import { User } from "../models/UserModel"
import bcryptjs, { hash } from "bcryptjs"
import { generateToken } from "../utils/jwt"

const register = async (req: Request, res: Response): Promise <any> => {
    const { email, password } = req.body
    
    try {
        // sanitizar o validar la data de entrada
        // persistir en la base de datos
        const validator = userSchema.safeParse({email, password})
        if(!validator.success) {
            return res.status(400).json({success: false, message: validator.error.issues })
        }
        
        const existingUser = await User.findOne({ email })

        if(existingUser){
            return res.status(400).json({ success: false, message: "Email ya registrado" })
        }

        const hash = await bcryptjs.hash(password, 10)

        const newUser = new User({email, password: hash})
        await newUser.save()

        const token = generateToken(newUser._id.toString())

        res.status(201).json({ success: true, message: "Usuario registrado exitosamente", data: { user: newUser._id, token}})
    }catch(error){
        console.log(error)
        const err = error as Error
        res.status(500).json({ success: false, message: err.message})
        // if((error as any).code===11000){
        //     res.status(400).json({ success: false, message: "Email ya existente"})
        // }
    }
}

const login = async ( req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body
    
    try {
        const validator = userSchema.safeParse({ email, password })

        if(!validator.success){
            return res.status(400).json({ success: false, message: validator.error.issues})
        }

        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ success: false, message: "Credenciales inválidas"})
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ success: false, message: "Credenciales inválidas"})
        }

        const token = generateToken(user._id.toString())
        res.status(200).json({ success: true, message: "Login exitoso", token})
    }catch(error){

    }
}

export { register, login }