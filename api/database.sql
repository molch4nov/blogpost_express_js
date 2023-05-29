create TABLE blog_posts(
    id SERIAL PRIMARY KEY,
    message VARCHAR(255),
    date timestamp NOT NULL DEFAULT NOW(),
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users (id)
);

create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

