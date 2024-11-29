import { BookModel, BookType } from "./book.model"
import { UpdateBookType } from "./book.types"

async function updateBookAction(libroId: string, datosActualizados: UpdateBookType): Promise<BookType | null> {
    const libroActualizado = await BookModel.findByIdAndUpdate(libroId, datosActualizados, { new: true })
    return libroActualizado
}
export default updateBookAction