import { Schema, model, Document } from "mongoose"

interface BookType extends Document {
    genero: string
    fechaPublicacion: Date
    Editorial: string
    autor: string
    nombre: string
    disponible: boolean
}
const BookSchema = new Schema<BookType>({
    genero: {
        type: String,
        required: true,
    },
    fechaPublicacion: {
        type: Date,
        required: true,
    },
    Editorial: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})
const BookModel = model<BookType>("Book", BookSchema)

export { BookModel, BookType }