
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTickets = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_ENDPOINTS.TICKETS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch tickets");
          setLoading(false);
          return;
        }
        setTickets(data);
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [navigate]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(tickets);
    } else {
      setFiltered(
        tickets.filter(
          t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.assignedTo?.email || "").toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, tickets]);

  // Stats for this user
  const myTotalTickets = tickets.length;
  const myActiveTickets = tickets.filter(t => t.status === "active").length;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-2 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">My Tickets</h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-4">View and track all your submitted tickets. Use the search to quickly find a ticket by title or assigned email.</p>
          {/* Dashboard Cards in a single row */}
          <div className="flex flex-wrap gap-4 w-full justify-start">
            <div className="flex-1 min-w-[140px] rounded-lg bg-[#232946] border border-indigo-700 p-4 text-center">
              <div className="text-xl font-bold text-indigo-300">{myTotalTickets}</div>
              <div className="text-gray-300 text-sm">My Total Tickets</div>
            </div>
            <div className="flex-1 min-w-[140px] rounded-lg bg-[#232946] border border-yellow-700 p-4 text-center">
              <div className="text-xl font-bold text-yellow-300">{myActiveTickets}</div>
              <div className="text-gray-300 text-sm">Active Tickets</div>
            </div>
          </div>
        </div>
        {/* Sticky Search Bar */}
        <div className="sticky top-4 z-10 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#181c2a]/80 p-4 rounded-xl shadow border border-gray-700">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or assigned email..."
            className="w-full sm:w-96 rounded-lg border border-gray-700 bg-[#232946] text-white px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500 outline-none shadow"
          />
        </div>
        {/* Ticket List as Grid */}
        {loading ? (
          <div className="text-gray-300 text-center py-10 text-lg font-medium">Loading tickets...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-10 text-lg font-medium">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-300 text-center py-10 text-lg font-medium">No tickets found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(ticket => (
              <div
                key={ticket._id || ticket.id}
                className="rounded-xl bg-[#232946] border border-gray-700 p-6 shadow hover:shadow-lg transition flex flex-col min-h-[180px] relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-indigo-300 break-words">{ticket.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold border
                    ${ticket.status === 'active' ? 'bg-yellow-500/10 text-yellow-300 border-yellow-400/30' :
                      ticket.status === 'closed' ? 'bg-green-500/10 text-green-300 border-green-400/30' :
                      'bg-pink-500/10 text-pink-300 border-pink-400/30'}`}
                  >
                    {ticket.status?.charAt(0).toUpperCase() + ticket.status?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-700/60 flex items-center justify-center text-white font-bold text-base shadow border border-indigo-400/30">
                    {(ticket.assignedTo?.email || ticket.assignedTo || "?")[0]?.toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-300">{ticket.assignedTo?.email || ticket.assignedTo || "Unassigned"}</span>
                </div>
                <p className="text-gray-200 text-sm mb-3 break-words leading-relaxed line-clamp-3">{ticket.description}</p>
                <div className="flex items-end justify-between mt-auto pt-2">
                  <span className="text-xs text-gray-400 italic">ID: {ticket._id || ticket.id}</span>
                  <button
                    onClick={() => navigate(`/ticket/${ticket._id || ticket.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
