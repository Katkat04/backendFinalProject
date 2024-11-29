import { Request, Response, NextFunction } from "express"

export function ableDeleteBooks(request: Request, response: Response, next: NextFunction) {
    if (request.user?.permisos.EliminarLibros) { 
        return next()
    }
    return response.status(403).json({ message: "Permiso denegado: no puedes eliminar libros" })
}