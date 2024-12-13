import { Router } from "express";
import {
  renderNewGenrePage,
  addNewGenre,
  renderGenrePage,
} from "../controllers/genreController.js";

const genreRouter = Router();

genreRouter.get("/new", renderNewGenrePage);
genreRouter.post("/new", addNewGenre);

genreRouter.get("/:genreName", renderGenrePage);

export default genreRouter;
