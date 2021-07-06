DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    page_count INTEGER NOT NULL,
    description TEXT,
    fiction BOOLEAN
);

INSERT INTO books (title, author, page_count, description, fiction)
VALUES 
('Crime and Punishment', 'Dostoyevskiy', 560, 'You would be certainly punished, when you do bad', true),
('Twilight', 'Stephanie Meyers', 370, 'Vampire Saga', true);

