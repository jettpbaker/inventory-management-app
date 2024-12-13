CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genre_name VARCHAR(50) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_genre_name_case_insensitive 
ON genres (LOWER(genre_name));

CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    book_name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre_id INTEGER REFERENCES genres(id),
    image_url VARCHAR(255),
    google_books_id VARCHAR(255),
    api_checked BOOLEAN DEFAULT FALSE,
    read_priority INTEGER NOT NULL,
    CONSTRAINT valid_priority CHECK (read_priority IN (1, 2, 3)),
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres(id)
);

INSERT INTO genres (genre_name) 
    VALUES ('fantasy');

INSERT INTO books (book_name, author, genre_id, read_priority) 
VALUES 
    ('The Name of the Wind', 'Patrick Rothfuss', 
        (SELECT id FROM genres WHERE genre_name = 'fantasy'), 2),
    ('The Way of Kings', 'Brandon Sanderson', 
        (SELECT id FROM genres WHERE genre_name = 'fantasy'), 1);