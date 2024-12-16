import { Router } from "express";
import {
  renderNewBookPage,
  addNewBook,
  deleteBook,
} from "../controllers/bookController.js";
const bookRouter = Router();

bookRouter.get("/new", renderNewBookPage);
bookRouter.post("/new", addNewBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
