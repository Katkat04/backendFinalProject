import { BookType } from "./book.model"

export type CreateBookType = Omit<BookType, "_id" | "disponible">

export type UpdateBookType = Partial<Omit<BookType, "_id" | "disponible">>

export type BookReferenceType = Pick<BookType, "_id" | "nombre">
