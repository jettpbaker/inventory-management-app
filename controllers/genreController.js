import {
  getBooksOfGenre,
  insertNewGenre,
  updateBook,
  deleteGenreWithName,
} from "../db/queries.js";
import { fetchBookImage } from "../services/googleBooksService.js";

export const renderNewGenrePage = async (req, res) => {
  const errorMessage = req.query.error || null;

  res.render("newGenre", { errorMessage });
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

  for (const book of books) {
    if (!book.api_checked) {
      const googleData = await fetchBookImage(book.book_name, book.author);
      await updateBook(googleData.imageURL, book.book_name, book.author);

      book.image_url = googleData.imageURL;
      book.api_checked = true;
    }
  }

  res.render("genre", { genreName, books });
};

export const deleteGenre = async (req, res) => {
  const genreName = req.params.genreName;

  try {
    const success = await deleteGenreWithName(genreName);

    if (success) {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Encountered error deleting genre" });
  }
};

/*

export const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    await deleteBookWithId(bookId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Encountered error deleting book" });
  }
};

*/
