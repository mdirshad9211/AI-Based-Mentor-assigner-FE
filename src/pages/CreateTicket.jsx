import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/tickets", {
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
      setSuccess("Ticket created successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
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
          {success && <div className="text-green-400 text-center font-semibold">{success}</div>}
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
