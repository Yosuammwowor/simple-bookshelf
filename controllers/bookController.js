import { getAllBooks } from "../models/books.js";

async function controllerGetAllBooks() {
  return await getAllBooks();
}

export { controllerGetAllBooks };
