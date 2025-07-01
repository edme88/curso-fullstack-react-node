
// un token se forma por 3 string unidos por puntos
// parte 1: que algoritmo se usa
// parte 2: cifrado del payload - el cifrado SI se puede desenmascarar la información
// parte 3: firma que asegura que el token fue certificado por el servidor

import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

const generateToken = (userId: string) => {
    return jwt.sign({userId}, JWT_SECRET, { expiresIn: "1h"})
}

export { generateToken }