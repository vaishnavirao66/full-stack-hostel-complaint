import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ComplaintForm() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("Electrical");

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        {
          title,
          description,
          category,
        }
      );

      toast.success(
        "Complaint Added Successfully"
      );

      setTitle("");
      setDescription("");
      setCategory("Electrical");

      window.location.reload();
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to add complaint"
      );
    }
  };

  return (
    <form
      onSubmit={submitComplaint}
      className="form"
    >
      <input
        type="text"
        placeholder="Complaint Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        required
      />

      <textarea
        placeholder="Complaint Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        required
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option>Electrical</option>
        <option>Water</option>
        <option>WiFi</option>
        <option>Cleaning</option>
        <option>Mess</option>
      </select>

      <button type="submit">
        Submit Complaint
      </button>
    </form>
  );
}

export default ComplaintForm;