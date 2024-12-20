import { Router } from "express";
import {
  renderNewGenrePage,
  addNewGenre,
  renderGenrePage,
  deleteGenre,
} from "../controllers/genreController.js";

const genreRouter = Router();

genreRouter.get("/new", renderNewGenrePage);
genreRouter.post("/new", addNewGenre);
genreRouter.get("/:genreName", renderGenrePage);
genreRouter.delete("/:genreName", deleteGenre);

export default genreRouter;
