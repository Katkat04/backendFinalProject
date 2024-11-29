import createReservationAction from "./create.reservation.action"
import { reservationsByBook, reservationsByUser } from "./read.reservation.action"
import { CreateReservationType, PopulatedReservationType } from "./reservation.types"

async function createReservation(datosReserva: CreateReservationType): Promise<PopulatedReservationType | null> {
    return await createReservationAction(datosReserva)
}
async function getBookReservations(libroId: string): Promise<PopulatedReservationType[]> {
    return await reservationsByBook(libroId)
}
async function getUserReservations(usuarioId: string): Promise<PopulatedReservationType[]> {
    return await reservationsByUser(usuarioId)
}
export { createReservation, getBookReservations, getUserReservations }