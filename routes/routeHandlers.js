import {
  controllerGetAllBooks,
  controllerGetBookById,
  controllerPostBook,
} from "../controllers/bookController.js";
import express from "express";
const router = express.Router();

router.get("/books", async (req, res) => {
  const result = await controllerGetAllBooks();

  if (result.status !== "success") res.status(404);

  return res.send(result);
});

router.get("/books/:id", async (req, res) => {
  const result = await controllerGetBookById(req.params.id);

  if (result.status !== "success") res.status(404);

  return res.send(result);
});

router.post("/books", async (req, res) => {
  const result = await controllerPostBook(req.body);

  if (result.status !== "success") res.status(404);

  return res.send(result);
});

export { router };
