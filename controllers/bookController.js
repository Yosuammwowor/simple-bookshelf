import { getAllBooks, insertBook } from "../models/books.js";

async function controllerGetAllBooks(res) {
  const result = await getAllBooks();

  if (result.status === "error") {
    res.status(500);
    return result;
  }

  return await getAllBooks();
}

async function controllerGetBookById(res, id) {
  const result = await controllerGetAllBooks(res);

  if (result.status === "error") return result;

  const bookIsValid = result.data.find((book) => book.id === id);

  if (!bookIsValid) {
    return { status: "fail", message: "Invalid, no book id match" };
  }

  return { status: "success", data: bookIsValid };
}

async function controllerPostBook(res, data) {
  const { id, title, author, year, status } = data;
  res.status(400);

  // Validation user input
  if (!id || !title || !author || !year || !status)
    return {
      status: "fail",
      message:
        "Invalid, missing value 'id', 'title', 'author', 'year', or 'status'",
    };

  if (
    typeof id != "string" ||
    typeof title != "string" ||
    typeof author != "string" ||
    typeof year != "number" ||
    typeof status != "string"
  )
    return { status: "fail", message: "Invalid, data type value" };

  let database = await controllerGetAllBooks(res);

  if (database.status === "error") return database;

  database = database.data;

  database.push({ id, title, author, year, status });

  res.status(200);
  return await insertBook(database);
}

export { controllerGetAllBooks, controllerGetBookById, controllerPostBook };
