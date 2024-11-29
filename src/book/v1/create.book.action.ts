import { BookModel, BookType } from "./book.model"
import { CreateBookType } from "./book.types"

async function createBookAction(datosLibro: CreateBookType): Promise<BookType> {
    const libroNuevo = await BookModel.create(datosLibro)
    return libroNuevo
}
export default createBookAction