import React, { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

function ComplaintList({
  complaints,
  setComplaints,
}) {
  const [search, setSearch] =
    useState("");

  const role =
    localStorage.getItem("role");

  const updateStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        {
          status: "Resolved",
        }
      );

      setComplaints(
        complaints.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "Resolved",
              }
            : item
        )
      );

      toast.success(
        "Complaint Resolved"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`
      );

      setComplaints(
        complaints.filter(
          (item) => item._id !== id
        )
      );

      toast.error(
        "Complaint Deleted"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredComplaints =
    complaints.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const pendingCount =
    complaints.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const resolvedCount =
    complaints.filter(
      (item) =>
        item.status === "Resolved"
    ).length;

  return (
    <div>
      {role === "Admin" && (
        <div className="dashboard">
          <div className="dashboard-card">
            <h3>📋 Total</h3>
            <p>{complaints.length}</p>
          </div>

          <div className="dashboard-card pending">
            <h3>⏳ Pending</h3>
            <p>{pendingCount}</p>
          </div>

          <div className="dashboard-card resolved">
            <h3>✅ Resolved</h3>
            <p>{resolvedCount}</p>
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search complaints..."
        className="search-bar"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <h2>Complaints</h2>

      {filteredComplaints.length === 0 ? (
        <p className="empty-text">
          📭 No complaints found
        </p>
      ) : (
        filteredComplaints.map((item) => (
          <div
            className="card"
            key={item._id}
          >
            <div className="card-top">
              <h3>{item.title}</h3>

              <span className="category">
                {item.category}
              </span>
            </div>

            <p>{item.description}</p>

            <p className="date">
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </p>

            <div
              className={`status ${
                item.status ===
                "Resolved"
                  ? "resolved-status"
                  : "pending-status"
              }`}
            >
              {item.status}
            </div>

            {role === "Admin" && (
              <div className="button-group">
                {item.status !==
                  "Resolved" && (
                  <button
                    className="resolve-btn"
                    onClick={() =>
                      updateStatus(
                        item._id
                      )
                    }
                  >
                    Mark Resolved
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteComplaint(
                      item._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ComplaintList;