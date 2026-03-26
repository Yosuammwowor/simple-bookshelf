import { controllerGetAllBooks } from "../controllers/bookController.js";
import express from "express";
const router = express.Router();

router.get("/books", async (req, res) => {
  res.send(await controllerGetAllBooks());
});

export { router };
