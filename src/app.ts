import express from "express"
import { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()

const SERVER_VERSION = "/libreria/v1/"

function routeNotFound(request: Request, response: Response) {
  response.status(404).json({
    message: "Route not found.",
  })
}
export default function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(routeNotFound)
  return app
}
dotenv.config()