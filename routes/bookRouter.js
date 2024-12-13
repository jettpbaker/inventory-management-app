import { Router } from "express";
import {
  renderNewBookPage,
  addNewBook,
} from "../controllers/bookController.js";
const bookRouter = Router();

bookRouter.get("/new", renderNewBookPage);
bookRouter.post("/new", addNewBook);

export default bookRouter;
