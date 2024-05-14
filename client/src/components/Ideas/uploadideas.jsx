import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";

const UploadIdeas = () => {
  const [studentName, setStudentName] = useState("");
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [message, setMessage] = useState("");
  const { currentUser } = useContext(UserContext);

  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const handleIdeaNameChange = (e) => {
    setIdeaName(e.target.value);
  };

  const handleIdeaDescriptionChange = (e) => {
    setIdeaDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      studentName,
      ideaName,
      ideaDescription,
      userId: currentUser.userId,

    };
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3002/uploadideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setStudentName("");
        setIdeaName("");
        setIdeaDescription("");
      } else {
        const errorData = await response.json(); 
        setMessage(errorData.message); 
      }
    } catch (error) {
      setMessage("Error uploading idea. Please try again later.");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="container mt-5">
        <h2 className="text-center mt-5">Upload Your Idea</h2>
        {message && <p className="text-center">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentName}
              onChange={handleStudentNameChange}
              name="name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ideaName" className="form-label">
              Idea Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ideaName"
              value={ideaName}
              name="ideaname"
              onChange={handleIdeaNameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ideaDescription" className="form-label">
              Idea Description
            </label>
            <textarea
              className="form-control"
              id="ideaDescription"
              rows="3"
              name="ideadescription"
              value={ideaDescription}
              onChange={handleIdeaDescriptionChange}
              placeholder="Description..."
              required
            ></textarea>
          </div>
          <button type="submit" className="uploadideabtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadIdeas;
