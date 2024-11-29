import { ReservationModel, ReservationType } from "./reservation.model"
import { PopulatedReservationType } from "./reservation.types"

async function reservationsByBook(libroId: string): Promise<PopulatedReservationType[]> {
    return await ReservationModel.find({ libro: libroId })
        .populate("libro", "nombre")
        .populate("usuario", "nombre") 
}
async function reservationsByUser(usuarioId: string): Promise<PopulatedReservationType[]> {
    return await ReservationModel.find({ usuario: usuarioId })
        .populate("libro", "nombre") 
        .populate("usuario", "nombre") 
}
export { reservationsByBook, reservationsByUser }