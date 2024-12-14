import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

// Serve the index.html file directly for all requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve("index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
