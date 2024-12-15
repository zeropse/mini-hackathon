import { useState, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import RetroButton from "./RetroButton";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    const postData = { title, content };

    if (!token) {
      setStatusMessage("You must be logged in to create a post.");
      setStatusType("error");
      return;
    }

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Post created:", data);
        setStatusMessage("Posted!");
        setStatusType("success");

        // Clear title and content after successful post
        setTitle("");
        setContent("");
      } else {
        console.error("Error creating post:", data);
        setStatusMessage(data.message || "Unknown error occurred.");
        setStatusType("error");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setStatusMessage(`Error: ${error.message}`);
      setStatusType("error");
    }

    // Clear status message after 10 seconds
    setTimeout(() => {
      setStatusMessage("");
    }, 10000);
  };

  // Use memoized options for SimpleMDE
  const simpleMDEOptions = useMemo(
    () => ({
      autofocus: false,
      spellChecker: false,
      status: false,
      toolbar: [
        "bold",
        "italic",
        "|",
        "heading",
        "code",
        "quote",
        "|",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
      ],
      hideIcons: ["side-by-side", "fullscreen"],
      placeholder: "Describe your post here...",
      minHeight: "300px",
    }),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">New Post</h1>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-1 border border-gray-300"
        />
        <SimpleMDE
          value={content}
          onChange={handleEditorChange}
          options={simpleMDEOptions}
          className="w-full"
        />

        <RetroButton
          onClick={handleSubmit}
          label="Post"
          className="text-4xl p-2"
        />

        {statusMessage && (
          <div
            className={`text-center mt-4 p-2 rounded-md ${
              statusType === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPost;
