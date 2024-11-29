import { Schema, model, Types, Document } from "mongoose"
import { BookReferenceType } from "../../book/v1/book.types"
import { UserReferenceType } from "../../user/v1/user.types"

interface ReservationType extends Document {
    libro: BookReferenceType
    usuario: UserReferenceType
    fechaReserva: Date
    fechaDevolucion: Date
    creadoEn: Date
    actualizadoEn: Date
}
const ReservationSchema = new Schema<ReservationType>(
    {
        libro: {
            type: Types.ObjectId,
            ref: "Book",
            required: true
        },
        usuario: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },
        fechaReserva: {
            type: Date,
            required: true
        },
        fechaDevolucion: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const ReservationModel = model<ReservationType>("Reservation", ReservationSchema)
export { ReservationModel, ReservationType }