import fetch from "node-fetch";

export async function fetchBookImage(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author}`);
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=1`
    );

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    if (!data.items || data.items.length === 0) {
      return { imageURL: null, googleBooksId: null, found: false };
    }

    const book = data.items[0];
    return {
      imageURL: book.volumeInfo?.imageLinks?.thumbnail || null,
      googleBooksId: book.id,
      found: true,
    };
  } catch (error) {
    console.error("Error fetching book data: ", error);
    return { imageURL: null, googleBooksId: null, found: false };
  }
}
