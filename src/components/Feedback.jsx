import { useState } from "react";
import RetroButton from "./RetroButton";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name}, for your feedback: "${feedback}"`);
    setName("");
    setFeedback("");
  };

  return (
    <div className="max-w-sm mx-auto p-4 border border-gray-400 bg-[#cecdcd] shadow-none mt-8">
      <h1 className="text-xl font-sans font-bold text-gray-800 mb-4">
        Feedback
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-sans font-medium text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-500 text-sm font-sans focus:outline-none focus:border-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="feedback"
            className="block text-sm font-sans font-medium text-gray-800"
          >
            Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-500 text-sm font-sans focus:outline-none focus:border-blue-500"
            placeholder="Your feedback"
            rows="4"
            required
          ></textarea>
        </div>
        <RetroButton type="submit" className="mt-4" label="Submit" />
      </form>
    </div>
  );
};

export default FeedbackForm;
