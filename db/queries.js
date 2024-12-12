import { pool } from "./pool.js";

export async function getAllGenres() {
  try {
    const { rows } = await pool.query("SELECT genre_name FROM genres");
    return rows;
  } catch (error) {
    console.error("Error getting all genres: ", error);
  }
}

export async function getAllBooks() {
  try {
    const { rows } = await pool.query(
      "SELECT book_name, author, read_priority FROM books"
    );
    return rows;
  } catch (error) {
    console.error("Error getting all books: ", error);
  }
}
