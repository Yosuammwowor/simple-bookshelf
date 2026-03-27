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

async function controllerPutBook(res, idTarget, data) {
  const result = await controllerGetAllBooks(res);

  // Check if file exist
  if (result.status === "error") {
    res.status(500);
    return result;
  }

  const isBookIndex = result.data.findIndex((book) => book.id === idTarget);

  // Check if there's a book by id
  if (isBookIndex == -1) {
    res.status(404);
    return { status: "fail", message: "Invalid, no book id match" };
  }

  const { title, author, year } = data;

  // Check property amount
  if (!title || !author || !year) {
    res.status(400);
    return {
      status: "fail",
      message: "Invalid, missing value 'title', 'author', or 'year'",
    };
  }

  // Check data type value
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof year !== "number"
  ) {
    res.status(400);
    return { status: "fail", message: "Invalid, data type value" };
  }

  // Modify data
  result.data[isBookIndex].title = title;
  result.data[isBookIndex].author = author;
  result.data[isBookIndex].year = year;

  // Overwrite json storage
  insertBook(result.data);

  return { status: "success", data: result.data };
}

async function controllerDeleteBook(res, id) {
  let result = await controllerGetAllBooks(res);

  // Check if file exist
  if (result.status === "error") {
    res.status(500);
    return result;
  }

  const isBookValid = result.data.find((book) => book.id === id);

  // Check if there's a book by id
  if (!isBookValid) {
    res.status(404);
    return { status: "fail", message: "Invalid, no book id match" };
  }

  // Remove book by id
  result = result.data.filter((book) => book.id !== id);

  // Overwrite json storage
  insertBook(result);

  return { status: "success", data: result };
}

export {
  controllerGetAllBooks,
  controllerGetBookById,
  controllerPostBook,
  controllerPutBook,
  controllerDeleteBook,
};
