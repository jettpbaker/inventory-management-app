import { pool } from "./pool.js";

export async function getAllGenres() {
  try {
    const { rows } = await pool.query("SELECT genre_name FROM genres");
    return rows;
  } catch (error) {
    console.error("Error getting all genres: ", error);
  }
}

export async function insertNewGenre(genre) {
  try {
    await pool.query("INSERT INTO genres (genre_name) VALUES ($1)", [genre]);
    return true;
  } catch (error) {
    // If genre already exists:
    if (error.code === "23505") {
      return false;
    }

    console.error("Error inserting new genre: ", error);
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

export async function getBooksOfGenre(genre) {
  try {
    const { rows } = await pool.query(
      "SELECT book_name, author, image_url, google_books_id, api_checked, read_priority FROM books b JOIN genres g ON b.genre_id = g.id WHERE LOWER(g.genre_name) = LOWER($1)",
      [genre]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching books by genre: ", error);
    throw new Error("Faled to fetch books by genre");
  }
}
