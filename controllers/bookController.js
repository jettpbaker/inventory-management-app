import {
  getAllGenres,
  insertNewBook,
  deleteBookWithId,
} from "../db/queries.js";

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
