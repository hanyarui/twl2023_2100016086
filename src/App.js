import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setUploadError("Please select an image.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRoYXJ1QG1haWwuY29tIiwiaWQiOiI2NDVlMmEyOGM0YWEyODVkYWM2NTMyMTAiLCJpYXQiOjE2ODM4OTI3ODUsImV4cCI6MTY4Mzk3OTE4NX0.uxiewl7NfXP-yNKBy6KzR6f_cYFj-S7Y_vCucBWR79k"; // Ganti dengan token yang valid

      const response = await axios.post(
        "https://express-passport-jwt-production.up.railway.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUploadSuccess("Image uploaded successfully");
      setUploadError("");
      console.log("Upload successful:", response.data);

      // Reset form fields after successful upload
      setImage(null);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError("Upload failed. Please try again.");
      }
      setUploadSuccess("");
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2>Image Upload Form</h2>
      {uploadError && <p>{uploadError}</p>}
      {uploadSuccess && <p>{uploadSuccess}</p>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default App;
