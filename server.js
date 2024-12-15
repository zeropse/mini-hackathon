import express from "express";
import path from "path";
import cors from "cors";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = "your-secret-key";

// Middleware
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Db
const db = new sqlite3.Database("./src/db/database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    username TEXT NOT NULL
  )
`);

// API route for user registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if the username already exists
  db.get("SELECT id FROM users WHERE username = ?", [username], (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Database error." });
    }
    if (row) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const stmt = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)"
    );
    stmt.run(username, password, function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error saving user to database." });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: this.lastID, username }, JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
      });

      res.status(201).json({ message: "User registered successfully!", token });
    });
  });
});

// API route for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  db.get(
    "SELECT id, username, password FROM users WHERE username = ?",
    [username],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: "Database error." });
      }
      if (!row) {
        return res
          .status(400)
          .json({ message: "Invalid username or password." });
      }

      if (row.password !== password) {
        return res
          .status(400)
          .json({ message: "Invalid username or password." });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: row.id, username: row.username },
        JWT_SECRET,
        {
          expiresIn: "7d", // Token expires in 7 days
        }
      );

      res.status(200).json({ message: "Login successful!", token });
    }
  );
});

// API route for fetching posts
app.get("/api/posts", (req, res) => {
  const query = `
    SELECT id, title, username
    FROM posts 
    ORDER BY id DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch posts." });
    }
    res.json(rows);
  });
});

// Middleware to authenticate the user using JWT
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // Attach the user (which contains the username) to the request object
    next();
  });
}

// Endpoint to create a new post
app.post("/api/posts", authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const { username } = req.user; // Get the username from the authenticated user

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  // Insert the new post into the database
  const query = "INSERT INTO posts (title, content, username) VALUES (?, ?, ?)";
  db.run(query, [title, content, username], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error inserting post", error: err.message });
    }
    res.status(201).json({ id: this.lastID, title, content, username });
  });
});

// Route to fetch a post by username and id
app.get("/api/posts/:username/:id", (req, res) => {
  const { username, id } = req.params;

  // Query the SQLite database to find the post by username and id
  const query = `SELECT * FROM posts WHERE username = ? AND id = ?`;
  db.get(query, [username, id], (err, post) => {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (post) {
      res.json(post); // Send the post data as JSON
    } else {
      res.status(404).json({ message: "Post not found" }); // If post doesn't exist
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
