create TABLE blogpost(
    id SERIAL PRIMARY KEY,
    message VARCHAR(255),
    date DATE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


