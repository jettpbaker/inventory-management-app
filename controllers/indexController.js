import { getAllBooks, getAllGenres } from "../db/queries.js";

export const renderIndexPage = async (req, res) => {
  const genres = await getAllGenres();

  res.render("index", { genres });
};
