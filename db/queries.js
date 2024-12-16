import { pool } from "./pool.js";

export async function getAllGenres() {
  try {
    const { rows } = await pool.query("SELECT id, genre_name FROM genres");
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
      "SELECT b.id, book_name, author, image_url, api_checked, read_priority FROM books b JOIN genres g ON b.genre_id = g.id WHERE LOWER(g.genre_name) = LOWER($1)",
      [genre]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching books by genre: ", error);
    throw new Error("Faled to fetch books by genre");
  }
}

export async function updateBook(imageURL, bookName, bookAuthor) {
  try {
    await pool.query(
      "UPDATE books SET image_url = $1, api_checked = true WHERE book_name = $2 AND author = $3",
      [imageURL, bookName, bookAuthor]
    );
  } catch (error) {
    console.error(`Error updating book ${bookName}: ${error}`);
    throw new Error("Failed to update book");
  }
}

export async function insertNewBook(name, author, genre_id, priority) {
  try {
    await pool.query(
      "INSERT INTO books (book_name, author, genre_id, read_priority) VALUES ($1, $2, $3, $4)",
      [name, author, genre_id, priority]
    );
    return true;
  } catch (error) {
    // If book already exists:
    if (error.code === "23505") {
      return false;
    }

    console.error("Error inserting new genre: ", error);
  }
}

export async function deleteBookWithId(id) {
  try {
    await pool.query("DELETE FROM books WHERE id = $1", [id]);
    return true;
  } catch (error) {
    console.error("Error deleting book by id: ", error);
    throw new Error("Failed to delete book by id");
  }
}

export async function deleteGenreWithName(name) {
  try {
    await pool.query("DELETE FROM genres WHERE genre_name = $1", [name]);
    return true;
  } catch (error) {
    console.error("Error deleting genre by name: ", error);
    throw new Error("Failed to delete genre by name");
  }
}
