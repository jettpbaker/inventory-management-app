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
    api_checked BOOLEAN DEFAULT FALSE,
    read_priority INTEGER NOT NULL,
    CONSTRAINT valid_priority CHECK (read_priority IN (1, 2, 3)),
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_book_author_case_insensitive
ON books (LOWER(book_name), LOWER(author));

INSERT INTO genres (genre_name) 
    VALUES ('Fantasy');

INSERT INTO books (book_name, author, genre_id, read_priority) 
VALUES 
    ('The Fellowsip of the Ring', 'J.R.R. Tolkien', 
        (SELECT id FROM genres WHERE genre_name = 'Fantasy'), 3);
