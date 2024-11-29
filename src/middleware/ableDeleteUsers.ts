import { Request, Response, NextFunction } from "express"

export function ableDeleteUsers(request: Request, response: Response, next: NextFunction) {
    if (request.user?._id.toString() === request.params.id) {
        return next()
    }
    if (request.user?.permisos.EliminarUsuarios) {
        return next()
    }
    return response.status(403).json({ message: "Permiso denegado: no puedes eliminar otros usuarios" })
}