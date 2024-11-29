import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "process"
import { UserModel } from "../user/v1/user.model"

export async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
    const encabezadoAutorizacion = request.headers.authorization
    if (!encabezadoAutorizacion) {
        return response.status(401).json({ message: "Falta la autorización" })
    }
    const token = encabezadoAutorizacion.split(" ")[1];
    if (!token) {
        return response.status(401).json({ message: "Token no proporcionado" })
    }
    try {
        const claveSecreta = (env as { JWT_SECRET: string }).JWT_SECRET
        const decodificado = jwt.verify(token, claveSecreta) as { id: string }
        
        const usuario = await UserModel.findById(decodificado.id)
        if (!usuario || !usuario.Activo) {
            return response.status(401).json({ message: "Usuario no autorizado o inactivo" })
        }
        request.user = usuario
        next()
    } catch (error) {
        return response.status(401).json({ message: "Token inválido" })
    }
}