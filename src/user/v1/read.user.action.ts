import { UserModel, UserType } from "./user.model"
async function readUserAction(incluirInactivos: boolean = false): Promise<UserType[]> {
    const filtro = incluirInactivos ? {} : { Activo: true }
    const resultados = await UserModel.find(filtro)
    return resultados
}
async function loginUser(email: string, contraseña: string): Promise<{ usuario: UserType} | null> {
    const usuario = await UserModel.findOne({ email, contraseña, Activo: true })
    if (!usuario) return null
    return { usuario}
}
export { readUserAction, loginUser }