import { Router, Request, Response } from "express"
import { createBook, readBooks, updateBook, deleteBook } from "./book.controller"
import { AuthMiddleware } from "../../middleware/auth"
import { ableCreateBooks } from "../../middleware/ableCreateBooks"
import { ableModifyBooks } from "../../middleware/ableModifyBooks"
import { ableDeleteBooks } from "../../middleware/ableDeleteBooks"

const bookRoutes = Router()

async function CreateBook(request: Request, response: Response) {
    try {
        const datosLibro = request.body
        const libroCreado = await createBook(datosLibro)
        response.status(201).json({
            mensaje: "Libro creado exitosamente",
            libro: libroCreado,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
async function GetBooks(request: Request, response: Response) {
    try {
        const resultado = await readBooks(request.query)
        response.status(200).json({
            mensaje: "Libros obtenidos exitosamente",
            libros: resultado,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
async function UpdateBook(request: Request, response: Response) {
    try {
        const libroId = request.params.id
        const datosActualizados = request.body
        const libroActualizado = await updateBook(libroId, datosActualizados)
        response.status(200).json({
            mensaje: "Libro actualizado exitosamente",
            libro: libroActualizado,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
async function DeleteBook(request: Request, response: Response) {
    try {
        const libroId = request.params.id
        const libroEliminado = await deleteBook(libroId)
        response.status(200).json({
            mensaje: "Libro eliminado exitosamente",
            libro: libroEliminado,
        })
    } catch (error) {
        response.status(400).json({
            mensaje: (error as Error).message,
        })
    }
}
bookRoutes.get("/", GetBooks)
bookRoutes.post("/", AuthMiddleware, ableCreateBooks, CreateBook)
bookRoutes.put("/:id", AuthMiddleware, ableModifyBooks, UpdateBook)
bookRoutes.delete("/:id", AuthMiddleware, ableDeleteBooks, DeleteBook)

export default bookRoutes