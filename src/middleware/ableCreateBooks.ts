import { Request, Response, NextFunction } from "express"

export function ableCreateBooks(request: Request, response: Response, next: NextFunction) {
    if (request.user?.permisos.CrearLibros) {
        return next()
    }
    return response.status(403).json({ message: "Permiso denegado: no puedes crear libros" })
}