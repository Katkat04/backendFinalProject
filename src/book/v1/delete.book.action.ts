import { BookModel, BookType } from "./book.model"

async function deleteBookAction(libroId: string): Promise<BookType | null> {
    const libroEliminado = await BookModel.findByIdAndUpdate(
        libroId,
        { disponible: false },
        { new: true }
    )
    return libroEliminado
}
export default deleteBookAction