import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api.js";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({});
  const [assigningTicket, setAssigningTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      
      // Fetch tickets with admin endpoint
      const ticketsRes = await fetch(API_ENDPOINTS.TICKETS_ADMIN_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ticketsData = await ticketsRes.json();
      
      if (!ticketsRes.ok) {
        setError(ticketsData.error || "Failed to fetch tickets");
        return;
      }
      
      setTickets(ticketsData.tickets);
      setStats(ticketsData.stats);

      // Fetch moderators
      const moderatorsRes = await fetch(API_ENDPOINTS.MODERATORS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const moderatorsData = await moderatorsRes.json();
      if (moderatorsRes.ok) {
        setModerators(moderatorsData);
      }

      // Fetch all users
      const usersRes = await fetch(API_ENDPOINTS.USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = await usersRes.json();
      if (usersRes.ok) {
        setUsers(usersData);
      }

    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(tickets);
    } else {
      setFiltered(
        tickets.filter(
          t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.assignedTo?.email || "").toLowerCase().includes(search.toLowerCase()) ||
            (t.createdBy?.email || "").toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, tickets]);

  const assignTicket = async (ticketId, moderatorId, autoAssign = false) => {
    try {
      const token = localStorage.getItem("token");
      const body = autoAssign 
        ? { autoAssign: true }
        : { assignedTo: moderatorId };

      const res = await fetch(API_ENDPOINTS.TICKET_ASSIGN(ticketId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      
      if (res.ok) {
        // Refresh data
        fetchData();
        setAssigningTicket(null);
        if (autoAssign && data.message) {
          alert(data.message); // Show auto-assignment result
        }
      } else {
        setError(data.error || "Failed to assign ticket");
      }
    } catch {
      setError("Network error while assigning ticket");
    }
  };

  const bulkAutoAssign = async () => {
    if (!confirm("Are you sure you want to auto-assign all unassigned tickets with skills?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.TICKETS_BULK_AUTO_ASSIGN, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message);
        fetchData(); // Refresh data
      } else {
        setError(data.error || "Failed to bulk auto-assign tickets");
      }
    } catch {
      setError("Network error during bulk auto-assignment");
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "TODO":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case "IN_PROGRESS":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "COMPLETED":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage all tickets and assign them to moderators</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-indigo-400">{stats.total || 0}</div>
            <div className="text-sm text-gray-400">Total Tickets</div>
          </div>
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.assigned || 0}</div>
            <div className="text-sm text-gray-400">Assigned</div>
          </div>
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.unassigned || 0}</div>
            <div className="text-sm text-gray-400">Unassigned</div>
          </div>
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed || 0}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.autoAssignable || 0}</div>
            <div className="text-sm text-gray-400">Auto-Assignable</div>
          </div>
        </div>

        {/* Auto-Assignment Controls */}
        {stats.autoAssignable > 0 && (
          <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-purple-400 font-semibold">Automatic Assignment Available</h3>
                <p className="text-gray-300 text-sm">
                  {stats.autoAssignable} tickets with detected skills can be auto-assigned to matching moderators.
                </p>
              </div>
              <button
                onClick={bulkAutoAssign}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Auto-Assign All
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search tickets, assignees, or creators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              Showing {filtered.length} of {tickets.length} tickets
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">All Tickets</h2>
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No tickets found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filtered.map((ticket) => (
                    <tr key={ticket._id} className="hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">{ticket.title}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {ticket.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">{ticket.createdBy?.email}</div>
                        <div className="text-xs text-gray-500">{ticket.createdBy?.role}</div>
                      </td>
                      <td className="px-6 py-4">
                        {ticket.assignedTo ? (
                          <div>
                            <div className="text-sm text-gray-300">{ticket.assignedTo.email}</div>
                            <div className="text-xs text-gray-500">{ticket.assignedTo.role}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setAssigningTicket(ticket._id)}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-medium"
                          >
                            {ticket.assignedTo ? 'Reassign' : 'Assign'}
                          </button>
                          <button
                            onClick={() => navigate(`/ticket/${ticket._id}`)}
                            className="text-green-400 hover:text-green-300 text-xs font-medium"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Assignment Modal */}
        {assigningTicket && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#181c2a] border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-white mb-4">Assign Ticket to Moderator</h3>
              <div className="space-y-3">
                <button
                  onClick={() => assignTicket(assigningTicket, null, true)}
                  className="w-full p-3 text-left bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold"
                >
                  🤖 Auto-Assign (AI matching based on skills)
                </button>
                <button
                  onClick={() => assignTicket(assigningTicket, null)}
                  className="w-full p-3 text-left bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300"
                >
                  Unassign (Remove current assignment)
                </button>
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-gray-400 text-sm mb-2">Manual Assignment:</p>
                  {moderators.map((moderator) => (
                    <button
                      key={moderator._id}
                      onClick={() => assignTicket(assigningTicket, moderator._id)}
                      className="w-full p-3 text-left bg-gray-800 hover:bg-gray-700 rounded-lg text-white mb-2"
                    >
                      <div className="flex justify-between items-center">
                        <span>{moderator.email}</span>
                        {moderator.skills && moderator.skills.length > 0 && (
                          <span className="text-xs text-gray-400">
                            Skills: {moderator.skills.slice(0, 2).join(', ')}
                            {moderator.skills.length > 2 && '...'}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setAssigningTicket(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
