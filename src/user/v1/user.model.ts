import { model, Schema } from "mongoose"

type UserType = {
    _id: string
    nombre: string
    cedula: number
    email: string
    contraseña: string
    permisos: {
        CrearLibros: boolean
        ModificarUsuarios: boolean
        ModificarLibros: boolean
        EliminarUsuarios: boolean
        EliminarLibros: boolean
    }
    Activo: boolean
}
const UserSchema = new Schema<UserType>({
    nombre: { type: String, required: true },
    cedula: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    permisos: {
        CrearLibros: { type: Boolean, default: false },
        ModificarUsuarios: { type: Boolean, default: false },
        ModificarLibros: { type: Boolean, default: false },
        EliminarUsuarios: { type: Boolean, default: false },
        EliminarLibros: { type: Boolean, default: false },
    },
    Activo: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false,
})
const UserModel = model<UserType>("User", UserSchema)

export { UserModel, UserSchema, UserType }