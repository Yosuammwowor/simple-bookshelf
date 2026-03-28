import {
  controllerGetAllBooks,
  controllerGetBookById,
  controllerPostBook,
  controllerPutBook,
  controllerDeleteBook,
} from "../controllers/bookController.js";
import express from "express";
const router = express.Router();

// Middleware logger handler
router.all("/{*splat}", (req, res, next) => {
  const timezone = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Makassar",
  });
  console.log(`${timezone} - ${req.method} ${req.originalUrl}`);

  next();
});

// Route handle get all books
router.get("/books", async (req, res) => {
  const result = await controllerGetAllBooks(res);
  return res.send(result);
});

// Route handle get specific book by id
router.get("/books/:id", async (req, res) => {
  const result = await controllerGetBookById(res, req.params.id);
  return res.send(result);
});

// Route handle create new book
router.post("/books", async (req, res) => {
  const result = await controllerPostBook(res, req.body);
  return res.send(result);
});

// Route handle modify existing data book
router.put("/books/:id", async (req, res) => {
  const result = await controllerPutBook(res, req.params.id, req.body);
  return res.send(result);
});

// Route remove specific book by id
router.delete("/books/:id", async (req, res) => {
  const result = await controllerDeleteBook(res, req.params.id);
  return res.send(result);
});

// Route handler no endpoint available
router.all("/{*splat}", (req, res) => {
  return res.status(404).send({ status: "fail", message: "Not Found" });
});

export { router };
