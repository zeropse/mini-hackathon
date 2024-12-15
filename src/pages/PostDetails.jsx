import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RetroButton from "../components/RetroButton";

const PostDetails = () => {
  const { username, id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const token = localStorage.getItem("token");

    fetch(`/api/posts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: newComment }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
        return response.json();
      })
      .then((updatedPost) => {
        setComments(updatedPost.comments);
        setNewComment("");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add comment");
      });
  };

  if (loading) {
    return (
      <p
        style={{
          fontFamily: "Verdana, sans-serif",
          textAlign: "center",
          fontSize: "16px",
          color: "#333",
        }}
      >
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p
        style={{
          fontFamily: "Verdana, sans-serif",
          textAlign: "center",
          fontSize: "16px",
          color: "red",
        }}
      >
        Error: {error}
      </p>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Verdana, sans-serif",
        margin: "20px auto",
        maxWidth: "800px",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          borderBottom: "2px solid #ccc",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <h1 style={{ fontSize: "24px", color: "#000" }}>{post.title}</h1>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Posted by{" "}
          <span style={{ fontWeight: "bold", color: "#0066cc" }}>
            @{post.username}
          </span>
        </p>
      </div>

      <div style={{ color: "#333" }}>
        <p>{post.content}</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          borderTop: "2px solid #ccc",
          paddingTop: "10px",
          textAlign: "center",
          fontSize: "12px",
          color: "#555",
        }}
      >
        <p style={{ fontStyle: "italic" }}>
          Part of codedex.io's holiday hackathon
        </p>
      </div>

      {/* Comments Section */}
      <div style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "20px", color: "#000", marginBottom: "10px" }}>
          Comments
        </h2>

        {comments.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {comments.map((comment, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  color: "#333",
                }}
              >
                <p>{comment.content}</p>
                <p
                  style={{ fontSize: "12px", color: "#555", marginTop: "5px" }}
                >
                  - {comment.username || "Anonymous"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#555" }}>
            No comments yet. Be the first to comment!
          </p>
        )}

        <div style={{ marginTop: "10px" }}>
          <textarea
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "2px",
              fontFamily: "Verdana, sans-serif",
              fontSize: "14px",
            }}
            rows="4"
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <RetroButton
            onClick={handleAddComment}
            label="Add Comment"
          ></RetroButton>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
