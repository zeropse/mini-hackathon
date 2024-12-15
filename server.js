import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in the .env file");
  process.exit(1); // Terminate the app if the JWT_SECRET is missing
}

// Middleware
app.use(cors());
app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to Cloud MongoDB");
});

// Schemas and Models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  comments: [
    {
      username: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

async function getNextPostId() {
  try {
    const lastPost = await Post.findOne().sort({ id: -1 });
    return lastPost ? lastPost.id + 1 : 1;
  } catch (error) {
    throw new Error("Failed to get next post ID");
  }
}

// API route for user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id, username }, JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.status(201).json({ message: "User registered successfully!", token });
  } catch (error) {
    res.status(500).json({ message: "Error saving user to database.", error });
  }
});

// API route for user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Database error.", error });
  }
});

// API route for fetching posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ id: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts.", error });
  }
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
    req.user = user;
    next();
  });
}

// Endpoint to create a new post
app.post("/api/post", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const { username } = req.user;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    // Get the next post ID
    const id = await getNextPostId();

    // Create a new post object
    const newPost = new Post({
      id,
      title,
      content,
      username,
      comments: [],
    });

    // Save the new post
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
});

// Endpoint to add a comment to a post
app.post("/api/posts/:id/", authenticateToken, async (req, res) => {
  const { id } = req.params; // Post ID
  const { comment } = req.body; // Comment content
  const { username } = req.user; // Logged-in username

  if (!comment) {
    return res.status(400).json({ message: "Comment content is required." });
  }

  try {
    // Find the post by its ID
    const post = await Post.findOne({ id: parseInt(id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment object
    const newComment = {
      username: username,
      content: comment,
    };

    // Add the new comment to the post's comments array
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(post); // Return the updated post with comments
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({ id: parseInt(id) }).exec();
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Search route
app.get("/api/search", async (req, res) => {
  const query = req.query.query || "";

  try {
    let posts;

    if (query.startsWith("@")) {
      // Search by username
      const username = query.slice(1); // Remove '@' from the query
      posts = await Post.find({
        username: { $regex: `^${username}`, $options: "i" }, // Search usernames case-insensitively
      });
    } else {
      // Search by title
      posts = await Post.find({
        title: { $regex: query, $options: "i" }, // Search titles case-insensitively
      });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts.", err });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
