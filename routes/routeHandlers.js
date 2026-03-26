import {
  controllerGetAllBooks,
  controllerGetBookById,
} from "../controllers/bookController.js";
import express from "express";
const router = express.Router();

router.get("/books", async (req, res) => {
  res.send(await controllerGetAllBooks());
});

router.get("/books/:id", async (req, res) => {
  const result = await controllerGetBookById(req.params.id);

  if (result.status === "fail") res.status(404);

  return res.send(result);
});

export { router };
