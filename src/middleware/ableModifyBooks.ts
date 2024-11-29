import { Request, Response, NextFunction } from "express"

export function ableModifyBooks(request: Request, response: Response, next: NextFunction) {
    if (request.user?.permisos.ModificarLibros) {
        return next()
    }
    return response.status(403).json({ message: "Permiso denegado: no puedes modificar libros" })
}