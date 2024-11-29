import { UserModel, UserType } from "./user.model"
async function deleteUserAction(usuarioId: string): Promise<UserType | null> {
    return await UserModel.findByIdAndUpdate(usuarioId, { Activo: false }, { new: true })
}
export default deleteUserAction