import { getAllBooks, insertBook } from "../models/books.js";

async function controllerGetAllBooks() {
  return await getAllBooks();
}

async function controllerGetBookById(id) {
  const res = await getAllBooks();

  if (res.status === "error") return res;

  const bookIsValid = res.data.find((book) => book.id === id);

  if (!bookIsValid) {
    return { status: "fail", message: "Invalid, no book id match" };
  }

  return { status: "success", data: bookIsValid };
}

async function controllerPostBook(data) {
  const { id, title, author, year, status } = data;

  let database = await controllerGetAllBooks();

  if (database.status === "error") return database;

  database = database.data;

  database.push({ id, title, author, year, status });

  return await insertBook(database);
}

export { controllerGetAllBooks, controllerGetBookById, controllerPostBook };
