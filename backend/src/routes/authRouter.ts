import { Router } from "express";
import { register, login } from "../controllers/authControllers";

const authRouter = Router()

authRouter.post("/login", login)

authRouter.post("/register", register)

export {authRouter};