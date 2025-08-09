import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModeratorDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is a moderator
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "moderator") {
      navigate("/login");
      return;
    }

    const fetchAssignedTickets = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("https://ai-based-mentor-assigner-be.vercel.app/api/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch tickets");
          return;
        }

        setTickets(data);
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTickets();
  }, [navigate]);

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ai-based-mentor-assigner-be.vercel.app/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Refresh tickets
        const updatedTickets = tickets.map(ticket =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        );
        setTickets(updatedTickets);
      } else {
        setError("Failed to update ticket status");
      }
    } catch (err) {
      setError("Network error while updating ticket");
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

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (priority) {
      case "HIGH":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "MEDIUM":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "LOW":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">Loading assigned tickets...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Moderator Dashboard</h1>
          <p className="text-gray-300">Manage tickets assigned to you</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid gap-4 mb-6">
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Assigned Tickets Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">{tickets.length}</div>
                <div className="text-sm text-gray-400">Total Assigned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {tickets.filter(t => t.status === "IN_PROGRESS").length}
                </div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {tickets.filter(t => t.status === "COMPLETED").length}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {tickets.filter(t => t.status === "TODO").length}
                </div>
                <div className="text-sm text-gray-400">Pending</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Your Assigned Tickets</h2>
          </div>

          {tickets.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">No tickets assigned to you yet.</p>
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Priority
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
                  {tickets.map((ticket) => (
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
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={getPriorityBadge(ticket.priority)}>
                          {ticket.priority || 'MEDIUM'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <select
                            value={ticket.status}
                            onChange={(e) => updateTicketStatus(ticket._id, e.target.value)}
                            className="bg-gray-700 border border-gray-600 text-white text-xs rounded px-2 py-1"
                          >
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                          <button
                            onClick={() => navigate(`/ticket/${ticket._id}`)}
                            className="text-indigo-400 hover:text-indigo-300 text-xs font-medium"
                          >
                            View Details
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
      </div>
    </div>
  );
}
