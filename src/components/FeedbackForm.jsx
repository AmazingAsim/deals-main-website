import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBaseUrl } from "../global/baseurlcontext";
import { useNavigate } from "react-router-dom";
function FeedbackForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const baseUrl = useBaseUrl()
  const fetchUrl = `${baseUrl}/product_api/feedback.php`;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", feedback: "" });
        navigate("/feedback");
      } else {
        const data = await response.json();
        setError(data.message || "Submission failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      {submitted && (
        <div className="alert alert-success" role="alert">
          Thank you! Your feedback has been submitted.
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">
            Feedback:
          </label>
          <textarea
            name="feedback"
            className="form-control"
            rows="4"
            required
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Your Feedback"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
