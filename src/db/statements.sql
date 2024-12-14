CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    FOREIGN KEY (username) REFERENCES users(username)
);


INSERT INTO users (username, password) VALUES ('admin', 'yourmomma123');
INSERT INTO posts (title, username)
VALUES ('Test Post 1', 'admin');

INSERT INTO posts (title, username)
VALUES ('Test Post 2', 'admin');


DROP TABLE posts;
DROP TABLE users;
