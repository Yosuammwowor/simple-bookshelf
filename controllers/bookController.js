import { getAllBooks } from "../models/books.js";

async function controllerGetAllBooks() {
  return await getAllBooks();
}

async function controllerGetBookById(id) {
  const res = await getAllBooks();

  const bookIsValid = res.data.find((book) => book.id === id);

  if (!bookIsValid) {
    return { status: "fail", message: "Invalid, no book id match" };
  }

  return { status: "success", data: bookIsValid };
}

export { controllerGetAllBooks, controllerGetBookById };
