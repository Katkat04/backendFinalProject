import { Router, Request, Response } from "express"
import { createReservation, getBookReservations, getUserReservations } from "./reservation.controller"
import { AuthMiddleware } from "../../middleware/auth"

const reservationRoutes = Router()
async function CreateReservation(request: Request, response: Response) {
    try {
        const datosReserva = request.body
        const reservaCreada = await createReservation({
            libro: datosReserva.libro,
            usuario: datosReserva.usuario,
            fechaReserva: datosReserva.fechaReserva,
            fechaDevolucion: datosReserva.fechaDevolucion
        })
        response.status(201).json({
            mensaje: "Reserva creada exitosamente",
            reserva: reservaCreada,
        })
    } catch (error) {
        response.status(500).json({
            mensaje: "Error al crear la reserva",
            error: (error as Error).message,
        })
    }
}
async function BookReservations(request: Request, response: Response) {
    const libroId = request.params.libroId

    try {
        const reservas = await getBookReservations(libroId);
        response.status(200).json({
            mensaje: "Reservas del libro obtenidas exitosamente.",
            reservas: reservas,
        })
    } catch (error) {
        response.status(500).json({
            mensaje: "Error al obtener las reservas del libro",
            error: (error as Error).message,
        })
    }
}
async function UserReservations(request: Request, response: Response) {
    const usuarioId = request.params.usuarioId
    try {
        const reservas = await getUserReservations(usuarioId);
        response.status(200).json({
            mensaje: "Reservas del usuario obtenidas exitosamente.",
            reservas: reservas,
        });
    } catch (error) {
        response.status(500).json({
            mensaje: "Error al obtener las reservas del usuario",
            error: (error as Error).message,
        })
    }
}
// endpoints
reservationRoutes.post("/", AuthMiddleware, CreateReservation)
reservationRoutes.get("/libros/:libroId", AuthMiddleware, BookReservations)
reservationRoutes.get("/usuarios/:usuarioId", AuthMiddleware, UserReservations)

export default reservationRoutes