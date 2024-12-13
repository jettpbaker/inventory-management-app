import { getAllGenres, insertNewBook } from "../db/queries.js";

export const renderNewBookPage = async (req, res) => {
  const genres = await getAllGenres();
  res.render("newBook", { genres });
};

export const addNewBook = async (req, res) => {
  const { bookName, bookAuthor, bookGenre, priority } = req.body;

  try {
    const success = await insertNewBook(
      bookName,
      bookAuthor,
      bookGenre,
      priority
    );

    if (success) {
      res.redirect("/");
    } else {
      res.send("Encountered error adding new book");
    }
  } catch (error) {
    res.send("Encountered error adding new book");
  }
};

/* 

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

*/
