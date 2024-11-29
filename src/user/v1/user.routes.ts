import { Router, Request, Response } from "express"
import { createUser, readUsers, login, updateUser, deleteUser } from "./user.controller"
import { AuthMiddleware } from "../../middleware/auth"
import { ableModifyUsers } from "../../middleware/ableModifyUsers"
import { ableDeleteUsers } from "../../middleware/ableDeleteUsers"


const userRoutes = Router()
async function GetUsers(request: Request, response: Response) {
    const incluirInactivos = request.query.incluirInactivos === 'true'
    try {
        const usuarios = await readUsers(incluirInactivos)
        response.status(200).json({
            mensaje: "Usuarios obtenidos exitosamente",
            usuarios,
        });
    } catch (error) {
        response.status(500).json({
            mensaje: "Error al obtener usuarios",
            error: (error as Error).message,
        })
    }
}
async function CreateUser(request: Request, response: Response) {
    try {
        const { usuario, token } = await createUser(request.body)
        response.status(201).json({
            mensaje: "Usuario creado exitosamente",
            usuario,
            token,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
async function LoginUser(request: Request, response: Response) {
    const { email, contraseña } = request.body
    try {
        const usuario = await login(email, contraseña)
        if (usuario) {
            response.status(200).json({
                mensaje: "Inicio de sesión exitoso",
                usuario,
            })    
        } else {
            response.status(401).json({ message: "Credenciales invalidas" })
        }
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
async function UpdateUser(request: Request, response: Response) {
    const usuarioId = request.params.id
    const datosActualizados = request.body
    try {
        const usuarioActualizado = await updateUser(usuarioId, datosActualizados)
        response.status(200).json({
            mensaje: "Usuario actualizado exitosamente",
            usuario: usuarioActualizado,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
async function DeleteUser(request: Request, response: Response) {
    const usuarioId = request.params.id
    try {
        const usuarioEliminado = await deleteUser(usuarioId);
        response.status(200).json({
            mensaje: "Usuario eliminado exitosamente",
            usuario: usuarioEliminado,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
// Endpoints
userRoutes.get("/", GetUsers)
userRoutes.post("/", CreateUser)
userRoutes.post("/login", LoginUser)
userRoutes.put("/:id", AuthMiddleware, ableModifyUsers, UpdateUser)
userRoutes.delete("/:id", AuthMiddleware, ableDeleteUsers, DeleteUser)

export default userRoutes