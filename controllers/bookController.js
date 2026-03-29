import { v4 as uuidv4 } from "uuid";
import { getAllBooks, insertBook } from "../models/books.js";

async function controllerGetAllBooks(res) {
  const result = await getAllBooks();

  if (result.status === "error") {
    return res.status(500).json(result);
  }

  return res.status(200).json(result);
}

async function controllerGetBookById(res, id) {
  const result = await getAllBooks();

  if (result.status === "error") {
    return res.status(500).json(result);
  }

  const bookIsValid = result.data.find((book) => book.id === id);

  if (!bookIsValid) {
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid, no book id match" });
  }

  return res.status(200).json({ status: "success", data: bookIsValid });
}

async function controllerPostBook(res, data) {
  let result = await getAllBooks();

  // Check storage exist
  if (result.status === "error") {
    return res.status(500).json(result);
  }

  const { title, author, year } = data;
  let { status } = data;
  res.status(400);

  // Validation user input
  if (!title || !author || !year)
    return res.json({
      status: "fail",
      message: "Invalid, missing value 'title', 'author', or 'year'",
    });

  // Status property optional, default "available"
  if (!status) status = "available";

  if (status !== "available" && status !== "reading" && status !== "finished")
    return res.json({
      status: "fail",
      message:
        "Invalid, status value option 'available', 'reading', or 'finished'",
    });

  // Check data type
  if (
    typeof title != "string" ||
    typeof author != "string" ||
    typeof year != "number"
  )
    return res.json({ status: "fail", message: "Invalid, data type value" });

  const id = uuidv4();
  result = result.data;

  // Added new data to existing old data
  result.push({ id, title, author, year, status });

  // Overwrite json storage
  await insertBook(result);

  return res.status(201).json({ status: "success", data: result });
}

async function controllerPutBook(res, idTarget, data) {
  const result = await getAllBooks();

  // Check if file exist
  if (result.status === "error") {
    return res.status(500).json(result);
  }

  const isBookIndex = result.data.findIndex((book) => book.id === idTarget);

  // Check if there's a book by id
  if (isBookIndex == -1) {
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid, no book id match" });
  }

  const { title, author, year } = data;

  // Check property amount
  if (!title || !author || !year) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid, missing value 'title', 'author', or 'year'",
    });
  }

  // Check data type value
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof year !== "number"
  ) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid, data type value" });
  }

  // Modify data
  result.data[isBookIndex].title = title;
  result.data[isBookIndex].author = author;
  result.data[isBookIndex].year = year;

  // Overwrite json storage
  await insertBook(result.data);

  return res.status(200).json({ status: "success", data: result.data });
}

async function controllerDeleteBook(res, id) {
  let result = await getAllBooks();

  // Check if storage exist
  if (result.status === "error") {
    return res.status(500).json(result);
  }

  const isBookValid = result.data.find((book) => book.id === id);

  // Check if there's a book by id
  if (!isBookValid) {
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid, no book id match" });
  }

  // Remove book by id
  result = result.data.filter((book) => book.id !== id);

  // Overwrite json storage
  await insertBook(result);

  return res.status(200).json({ status: "success", data: result });
}

export {
  controllerGetAllBooks,
  controllerGetBookById,
  controllerPostBook,
  controllerPutBook,
  controllerDeleteBook,
};
