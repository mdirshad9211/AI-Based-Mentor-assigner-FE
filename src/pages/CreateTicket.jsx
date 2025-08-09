import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";


export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [assignmentInfo, setAssignmentInfo] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.TICKETS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create ticket");
        setLoading(false);
        return;
      }
      
      // Show assignment information
      setAssignmentInfo({
        autoAssigned: data.autoAssigned,
        relatedSkills: data.relatedSkills || [],
        assignedTo: data.ticket?.assignedTo?.email || null
      });
      
      setSuccess(data.message || "Ticket created successfully!");
      setTitle("");
      setDescription("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewTickets = () => {
    navigate("/all-tickets");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-2">
      <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#181c2a]/90 backdrop-blur-md p-10">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Create Ticket</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={5}
              className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
          {error && <div className="text-red-400 text-center font-semibold">{error}</div>}
          {success && (
            <div className="space-y-3">
              <div className="text-green-400 text-center font-semibold">{success}</div>
              {assignmentInfo && (
                <div className="bg-[#232946] border border-gray-700 rounded-lg p-4 space-y-2">
                  <h4 className="text-white font-semibold text-sm">Assignment Information:</h4>
                  {assignmentInfo.relatedSkills.length > 0 && (
                    <div className="text-gray-300 text-sm">
                      <span className="font-medium">Detected Skills:</span> {assignmentInfo.relatedSkills.join(', ')}
                    </div>
                  )}
                  {assignmentInfo.autoAssigned ? (
                    <div className="text-green-400 text-sm">
                      ✅ Auto-assigned to: {assignmentInfo.assignedTo}
                    </div>
                  ) : assignmentInfo.relatedSkills.length > 0 ? (
                    <div className="text-yellow-400 text-sm">
                      ⚠️ No suitable moderator found for auto-assignment
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">
                      ℹ️ No skills detected for auto-assignment
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-600 transition w-full disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </form>
        <div className="text-center mt-8">
          <button
            onClick={handleViewTickets}
            className="rounded-md bg-gray-700 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-500 transition"
          >
            View My Tickets
          </button>
        </div>
      </div>
    </section>
  );
}
