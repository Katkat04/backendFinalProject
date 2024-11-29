import { UserType } from "./user.model"

export type CreateUserType = Omit<UserType, "_id">
export type UpdateUserType = Omit<Partial<UserType>, "_id">
export type UserReferenceType = Pick<UserType, "_id" | "nombre">

declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string
                permisos: {
                    CrearLibros: boolean
                    EliminarLibros: boolean
                    EliminarUsuarios: boolean
                    ModificarLibros: boolean
                    ModificarUsuarios: boolean
                }
                Activo: boolean
            }
        }
    }
}

export {}