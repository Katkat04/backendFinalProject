import createUserAction from "./create.user.action"
import { readUserAction, loginUser } from "./read.user.action"
import { updateUserAction } from "./update.user.action"
import deleteUserAction from "./delete.user.action"
import { UserModel, UserType } from "./user.model"
import { CreateUserType, UpdateUserType } from "./user.types"

const CorreoValido = (email: string): boolean => {
    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return expresionCorreo.test(email)
}
async function readUsers(incluirInactivos: boolean = false): Promise<UserType[]> {
    return await readUserAction(incluirInactivos)
}
async function createUser(datosUsuario: CreateUserType): Promise<{ usuario: UserType; token: string }> {
    const { nombre, cedula, email, contraseña } = datosUsuario
    if (!nombre || !cedula || !email || !contraseña) {
        throw new Error("Todos los campos son obligatorios.")
    }
    if (!CorreoValido(email)) {
        throw new Error("Correo inválido, intente de nuevo.")
    }
    return await createUserAction(datosUsuario)
}
async function login(email: string, contraseña: string): Promise<{ usuario: UserType} | null> {
    if (!email || !contraseña) {
        throw new Error("Correo electrónico y contraseña son requeridos")
    }
    if (!CorreoValido(email)) {
        throw new Error("Correo inválido, intente nuevamente")
    }
    return await loginUser(email, contraseña)
}
async function updateUser(usuarioId: string, datosActualizados: UpdateUserType): Promise<UserType | null> {
    const usuarioAActualizar = await UserModel.findById(usuarioId);
    if (!usuarioAActualizar || !usuarioAActualizar.Activo) {
        throw new Error("El usuario no existe")
    }
    return await updateUserAction(usuarioId, datosActualizados)
}
async function deleteUser(usuarioId: string): Promise<UserType | null> {
    const usuarioAActualizar = await UserModel.findById(usuarioId)
    if (!usuarioAActualizar || !usuarioAActualizar.Activo) {
        throw new Error("El usuario no existe")
    }
    return await deleteUserAction(usuarioId)
}
export { readUsers, createUser, login, updateUser, deleteUser }