import { Router } from "express";

const genreRouter = Router();

genreRouter.get("/:genreName", (req, res) => {
  const genreName = req.params.genreName;
  res.send(`Genre: ${genreName}`);
});

export default genreRouter;
