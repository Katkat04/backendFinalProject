import express from "express"
import { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import userSection from "./user/v1/user.routes"
import bookSection from "./book/v1/book.routes"
import reservationSection from "./reservation/v1/reservation.routes"

dotenv.config()
const SERVER_VERSION = "/libreria/v1/"

function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found",
  })
}
export default function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(SERVER_VERSION + "usuarios", userSection)
  app.use(SERVER_VERSION + "libros", bookSection)
  app.use(SERVER_VERSION + "reservas", reservationSection)
  app.use(routeNotFound)
  return app
}
dotenv.config()