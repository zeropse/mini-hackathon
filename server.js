import express from "express";
import path from "path";
import cors from "cors";
import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = "your-secret-key"; // Secret key for JWT signing (you can use an env variable)

// Middleware
app.use(cors());
app.use(express.json()); // This is required to parse JSON data from the body

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Database setup
const db = new sqlite3.Database("./src/db/database.db");

// Create tables if they don't exist
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

    // Insert user into the database
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
        expiresIn: "1h", // Token expires in 1 hour
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

  // Fetch user by username
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

      // Check if the password matches
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
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      res.status(200).json({ message: "Login successful!", token });
    }
  );
});

// API route for fetching posts
app.get("/api/posts", (req, res) => {
  const query = "SELECT id, title, username FROM posts ORDER BY id DESC";

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch posts." });
    }
    res.json(rows);
  });
});

// Catch-all for React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
