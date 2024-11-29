import { UserModel, UserType } from "./user.model"
async function updateUserAction(usuarioId: string, datosActualizados: Partial<UserType>): Promise<UserType | null> {
    return await UserModel.findByIdAndUpdate(usuarioId, datosActualizados, { new: true });
}
export { updateUserAction }