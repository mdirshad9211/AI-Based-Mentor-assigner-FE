
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", status: "", helpfulNotes: "" });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://ai-based-mentor-assigner-be.vercel.app/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch ticket");
          setLoading(false);
          return;
        }
        setTicket(data.ticket || data);
        setForm({
          title: data.ticket?.title || data.title || "",
          description: data.ticket?.description || data.description || "",
          status: data.ticket?.status || data.status || "",
          helpfulNotes: data.ticket?.helpfulNotes || data.helpfulNotes || "",
        });
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleEditChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");
    setUpdateLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ai-based-mentor-assigner-be.vercel.app/api/tickets/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateError(data.error || "Failed to update ticket");
        setUpdateLoading(false);
        return;
      }
      setUpdateSuccess("Ticket updated successfully!");
      setEditMode(false);
      setTicket(t => ({ ...t, ...form }));
    } catch {
      setUpdateError("Network error. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-300">Loading ticket...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-red-400">{error}</div>;
  }
  if (!ticket) {
    return <div className="min-h-screen flex items-center justify-center text-lg text-gray-300">Ticket not found.</div>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-2">
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#181c2a]/90 backdrop-blur-md p-10">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Ticket Details</h2>
        {editMode ? (
          <form className="space-y-6" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleEditChange}
                required
                className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleEditChange}
                required
                rows={5}
                className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-white mb-2">Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="progress">Progress</option>
                <option value="TODO">TODO</option>
              </select>
            </div>
            <div>
              <label htmlFor="helpfulNotes" className="block text-sm font-semibold text-white mb-2">Helpful Notes</label>
              <textarea
                id="helpfulNotes"
                name="helpfulNotes"
                value={form.helpfulNotes}
                onChange={handleEditChange}
                rows={3}
                className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
            {updateError && <div className="text-red-400 text-center font-semibold">{updateError}</div>}
            {updateSuccess && <div className="text-green-400 text-center font-semibold">{updateSuccess}</div>}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-600 transition w-full disabled:opacity-60"
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Update Ticket"}
              </button>
              <button
                type="button"
                className="rounded-md bg-gray-700 px-6 py-2 text-white font-semibold shadow hover:bg-gray-600 transition w-full"
                onClick={() => { setEditMode(false); setUpdateError(""); setUpdateSuccess(""); }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <span className="text-xs text-gray-400">Ticket ID: {ticket._id || ticket.id}</span>
              <h3 className="text-2xl font-bold text-indigo-300 mt-2 mb-2">{ticket.title}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border
                ${ticket.status === 'active' ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/30' :
                  ticket.status === 'closed' ? 'bg-green-500/10 text-green-300 border-green-400/30' :
                  ticket.status === 'progress' ? 'bg-pink-500/10 text-pink-300 border-pink-400/30' :
                  'bg-gray-500/10 text-gray-300 border-gray-400/30'}`}
              >
                {ticket.status?.charAt(0).toUpperCase() + ticket.status?.slice(1)}
              </span>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Assigned To:</div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-700/60 flex items-center justify-center text-white font-bold text-lg shadow border border-indigo-400/30">
                  {(ticket.assignedTo?.email || ticket.assignedTo || "?")[0]?.toUpperCase()}
                </div>
                <span className="text-indigo-200 text-base font-medium">{ticket.assignedTo?.email || ticket.assignedTo || "Unassigned"}</span>
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Description:</div>
              <div className="text-gray-200 text-base leading-relaxed whitespace-pre-line">{ticket.description}</div>
            </div>
            {ticket.helpfulNotes && (
              <div>
                <div className="text-gray-400 text-sm mb-1">Helpful Notes:</div>
                <div className="text-gray-200 text-base leading-relaxed whitespace-pre-line">{ticket.helpfulNotes}</div>
              </div>
            )}
            <div className="flex gap-4 mt-6">
              {(role === "admin" || role === "moderator") && (
                <button
                  className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-600 transition w-full"
                  onClick={() => setEditMode(true)}
                >
                  Edit Ticket
                </button>
              )}
              <button
                className="rounded-md bg-gray-700 px-6 py-2 text-white font-semibold shadow hover:bg-gray-600 transition w-full"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
