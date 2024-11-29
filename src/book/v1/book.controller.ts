import createBookAction from "./create.book.action"
import { findBookById, findBooksByFilters } from "./read.book.action"
import updateBookAction from "./update.book.action"
import deleteBookAction from "./delete.book.action"
import { BookModel, BookType } from "./book.model"
import { CreateBookType, UpdateBookType } from "./book.types"
import mongoose from "mongoose"

async function createBook(datosLibro: CreateBookType): Promise<BookType> {
    const { nombre, autor, genero, Editorial, fechaPublicacion } = datosLibro
    if (!nombre || !autor || !genero || !Editorial || !fechaPublicacion) {
        throw new Error("Los campos nombre, autor, género, Editorial, fechaPublicacion son obligatorios")
    }
    return await createBookAction(datosLibro);
}
async function readBooks(query: any): Promise<BookType | BookType[] | null> {
    const libroId = query.id as string | null
    const incluirNoDisponible = query.incluirNoDisponible=== "true"
    const filtros = {
        genero: query.genre as string,
        fechaPublicacion: query.fechaPublicacion ? new Date(query.fechaPublicacion as string) : undefined,
        Editorial: query.Editorial as string,
        autor: query.autor as string,
        nombre: query.nombre as string,
    }
    if (libroId && !mongoose.Types.ObjectId.isValid(libroId)) {
        throw new Error("Formato de ID de libro inválido.")
    }
    if (libroId) {
        const libro = await findBookById(libroId, incluirNoDisponible)
        if (!libro) {
            throw new Error("Libro no encontrado.")
        }
        return libro;
    } else {
        if (filtros.fechaPublicacion && isNaN(filtros.fechaPublicacion.getTime())) {
            throw new Error("La fecha de publicación proporcionada es inválida.")
        }
        const libros = await findBooksByFilters(filtros, incluirNoDisponible)
        return libros
    }
}
async function updateBook(libroId: string, datosActualizados: UpdateBookType): Promise<BookType | null> {
    if (!mongoose.Types.ObjectId.isValid(libroId)) {
        throw new Error("Formato de ID de libro inválido")
    }
    const libroAActualizar = await BookModel.findById(libroId)
    if (!libroAActualizar || !libroAActualizar.disponible) {
        throw new Error("El libro no está disponible o no existe")
    }
    return await updateBookAction(libroId, datosActualizados)
}
async function deleteBook(libroId: string): Promise<BookType | null> {
    if (!mongoose.Types.ObjectId.isValid(libroId)) {
        throw new Error("Formato de ID de libro inválido")
    }
    const libroAEliminar = await BookModel.findById(libroId)
    if (!libroAEliminar || !libroAEliminar.disponible) {
        throw new Error("El libro ya no está disponible o no existe")
    }
    return await deleteBookAction(libroId)
}
export { createBook, readBooks, updateBook, deleteBook }