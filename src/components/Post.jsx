import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import RetroButton from "./RetroButton";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    if (!title || !content) {
      return;
    }
    console.log("Title:", title);
    console.log("Content:", content);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">new post</h1>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <SimpleMDE
          value={content}
          onChange={handleEditorChange}
          options={{
            autofocus: true,
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
          }}
          className="w-full"
        />
        <RetroButton
          onClick={handleSubmit}
          label="post"
          className="text-4xl p-2"
        />
      </div>
    </div>
  );
};

export default Post;
