import { BookModel, BookType } from "./book.model"

async function findBookById(libroId: string, incluirNoDisponible: boolean = false): Promise<BookType | null> {
    libroId = libroId.trim()
    const consulta = incluirNoDisponible ? { _id: libroId } : { _id: libroId, disponible: true }
    return await BookModel.findOne(consulta)
}
async function findBooksByFilters(filtros: Partial<BookType>, incluirNoDisponible: boolean = false): Promise<BookType[]> {
    const consulta: any = incluirNoDisponible ? {} : { disponible: true }

    if (filtros.genero) consulta.genero = { $regex: filtros.genero, $options: "i" }
    if (filtros.Editorial) consulta.Editorial = { $regex: filtros.Editorial, $options: "i" }
    if (filtros.autor) consulta.autor = { $regex: filtros.autor, $options: "i" }
    if (filtros.nombre) consulta.nombre = { $regex: filtros.nombre, $options: "i" }
    if (filtros.fechaPublicacion) {
        const inicioDia = new Date(filtros.fechaPublicacion)
        inicioDia.setHours(0, 0, 0, 0)
        const finDia = new Date(filtros.fechaPublicacion)
        finDia.setHours(23, 59, 59, 999)
        consulta.fechaPublicacion = { $gte: inicioDia, $lte: finDia }
    }

    return await BookModel.find(consulta)
}
export { findBookById, findBooksByFilters }