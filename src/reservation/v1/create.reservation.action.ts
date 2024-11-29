import { ReservationModel, ReservationType } from "./reservation.model"
import { CreateReservationType } from "./reservation.types"
import { Types } from "mongoose"

async function createReservationAction(datosReserva: CreateReservationType): Promise<ReservationType> {
    const datosReservaCreada = {
        ...datosReserva,
        libro: new Types.ObjectId(datosReserva.libro), 
        usuario: new Types.ObjectId(datosReserva.usuario),
    }
    return await ReservationModel.create(datosReservaCreada)
}
export default createReservationAction