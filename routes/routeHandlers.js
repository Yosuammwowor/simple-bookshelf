import {
  controllerGetAllBooks,
  controllerGetBookById,
  controllerPostBook,
} from "../controllers/bookController.js";
import express from "express";
const router = express.Router();

router.get("/books", async (req, res) => {
  const result = await controllerGetAllBooks(res);
  return res.send(result);
});

router.get("/books/:id", async (req, res) => {
  const result = await controllerGetBookById(res, req.params.id);
  return res.send(result);
});

router.post("/books", async (req, res) => {
  const result = await controllerPostBook(res, req.body);
  return res.send(result);
});

export { router };
