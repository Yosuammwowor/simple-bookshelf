import express from "express";
import { router } from "./routes/routeHandlers.js";

const app = express();

app.use(express.json());
app.use(router);

app.listen(8000, () => {
  console.log("Server running at http://localhost:8000");
});
