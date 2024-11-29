import { UserModel, UserType } from "./user.model"
import { CreateUserType } from "./user.types"
import jwt from "jsonwebtoken"

async function createUserAction(datosUsuario: CreateUserType): Promise<{ usuario: UserType; token: string }> {
    const usuario = await UserModel.create(datosUsuario)
    const claveSecreta = process.env.JWT_SECRET as string
    const token = jwt.sign({ id: usuario._id }, claveSecreta)
    return { usuario, token }
}
export default createUserAction