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

  if (result.status === "error") {
    res.status(500);
    return result;
  }

  const bookIsValid = result.data.find((book) => book.id === id);

  if (!bookIsValid) {
    res.status(404);
    return { status: "fail", message: "Invalid, no book id match" };
  }

  return { status: "success", data: bookIsValid };
}

async function controllerPostBook(res, data) {
  let result = await controllerGetAllBooks(res);

  // Check storage exist
  if (result.status === "error") {
    res.status(500);
    return result;
  }

  const { id, title, author, year } = data;
  let { status } = data;
  res.status(400);

  // Validation user input
  if (!id || !title || !author || !year)
    return {
      status: "fail",
      message: "Invalid, missing value 'id', 'title', 'author', or 'year'",
    };

  // Status property optional, default "available"
  if (!status) status = "available";

  if (status !== "available" && status !== "reading" && status !== "finished")
    return {
      status: "fail",
      message:
        "Invalid, status value option 'available', 'reading', or 'finished'",
    };

  // Check data type
  if (
    typeof id != "string" ||
    typeof title != "string" ||
    typeof author != "string" ||
    typeof year != "number"
  )
    return { status: "fail", message: "Invalid, data type value" };

  result = result.data;

  // Check if there's duplicate book by id
  const isBookDuplicate = result.some((book) => book.id === id);
  if (isBookDuplicate) {
    res.status(409);
    return { status: "fail", message: "Invalid, duplicate id book" };
  }

  // Added new data to existing old data
  result.push({ id, title, author, year, status });

  // Overwrite json storage
  res.status(201);
  return await insertBook(result);
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
