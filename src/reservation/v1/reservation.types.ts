import { Types } from "mongoose"
import { BookReferenceType } from "../../book/v1/book.types"
import { UserReferenceType } from "../../user/v1/user.types"
import { ReservationType } from "./reservation.model"

export type CreateReservationType = {
    libro: Types.ObjectId
    usuario: Types.ObjectId
    fechaReserva: Date
    fechaDevolucion: Date
}
export type PopulatedReservationType = Omit<ReservationType, "libro" | "usuario"> & {
    libro: BookReferenceType
    usuario: UserReferenceType
}