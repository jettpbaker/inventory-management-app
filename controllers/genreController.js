import {
  getAllGenres,
  getBooksOfGenre,
  insertNewGenre,
} from "../db/queries.js";

export const renderNewGenrePage = async (req, res) => {
  const genres = await getAllGenres();
  const errorMessage = req.query.error || null;

  res.render("newGenre", { genres, errorMessage });
};

export const addNewGenre = async (req, res) => {
  const newGenre = req.body.genreName.trim();

  try {
    const success = await insertNewGenre(newGenre);
    if (success) {
      res.redirect("/");
    } else {
      res.redirect("/genre/new?error=Genre already exists");
    }
  } catch (error) {
    console.error("Error in genre creation route: ", error);
    res.redirect(
      "/genres/new?error=An error occurred while creating the genre"
    );
  }
};

export const renderGenrePage = async (req, res) => {
  const genreName = req.params.genreName;

  const books = await getBooksOfGenre(genreName);
  console.log(books);

  res.render("genre", { genreName });
};
