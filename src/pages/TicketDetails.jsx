import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyText, setReplyText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const userRole = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTicketDetails();
  }, [id, navigate]);

  const fetchTicketDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ai-based-mentor-assigner-be.vercel.app/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to fetch ticket details");
        return;
      }
      
      setTicket(data.ticket);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmittingReply(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ai-based-mentor-assigner-be.vercel.app/api/tickets/${id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: replyText }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setReplyText("");
        fetchTicketDetails(); // Refresh ticket data
        alert(data.message);
      } else {
        setError(data.error || "Failed to add reply");
      }
    } catch {
      setError("Network error while adding reply");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleUserFeedback = async (isResolved) => {
    setIsSubmittingFeedback(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://ai-based-mentor-assigner-be.vercel.app/api/tickets/${id}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          isResolved, 
          feedbackMessage: feedbackText 
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setFeedbackText("");
        fetchTicketDetails(); // Refresh ticket data
        alert(data.message);
      } else {
        setError(data.error || "Failed to submit feedback");
      }
    } catch {
      setError("Network error while submitting feedback");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full";
    switch (status) {
      case "TODO":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case "IN_PROGRESS":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "COMPLETED":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "REOPENED":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] flex items-center justify-center">
        <div className="text-white text-xl">Loading ticket details...</div>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  const isTicketCreator = ticket?.createdBy?.email === userEmail;
  const canAddReply = userRole === "admin" || userRole === "moderator";
  const canProvideFeedback = isTicketCreator && ticket?.status === "COMPLETED" && ticket?.userFeedback?.isResolved === null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-white">{ticket?.title}</h1>
            <span className={getStatusBadge(ticket?.status)}>{ticket?.status}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <strong>Created by:</strong> {ticket?.createdBy?.email}
            </div>
            <div>
              <strong>Created at:</strong> {formatDate(ticket?.createdAt)}
            </div>
            <div>
              <strong>Assigned to:</strong> {ticket?.assignedTo?.email || "Unassigned"}
            </div>
            <div>
              <strong>Status:</strong> {ticket?.status}
            </div>
          </div>

          {ticket?.relatedSkills && ticket.relatedSkills.length > 0 && (
            <div className="mt-4">
              <strong className="text-gray-300">Related Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {ticket.relatedSkills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{ticket?.description}</p>
        </div>

        {/* Replies */}
        {ticket?.replies && ticket.replies.length > 0 && (
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Replies</h2>
            <div className="space-y-4">
              {ticket.replies.map((reply, idx) => (
                <div key={idx} className="bg-[#232946] border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-indigo-400">
                      {reply.repliedBy?.email} ({reply.repliedBy?.role})
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(reply.repliedAt)}
                    </span>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{reply.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Feedback Section */}
        {ticket?.userFeedback?.isResolved !== null && (
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">User Feedback</h2>
            <div className="bg-[#232946] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  ticket.userFeedback.isResolved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {ticket.userFeedback.isResolved ? 'Issue Resolved' : 'Issue Not Resolved'}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(ticket.userFeedback.feedbackAt)}
                </span>
              </div>
              {ticket.userFeedback.feedbackMessage && (
                <p className="text-gray-300 mt-2">{ticket.userFeedback.feedbackMessage}</p>
              )}
            </div>
          </div>
        )}

        {/* Add Reply Form (Moderators/Admins only) */}
        {canAddReply && (
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add Reply</h2>
            <form onSubmit={handleAddReply}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full bg-[#232946] border border-gray-700 rounded-lg p-4 text-white resize-none outline-none focus:border-indigo-500"
                rows={4}
                required
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingReply || !replyText.trim()}
                  className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {isSubmittingReply ? "Adding Reply..." : "Add Reply & Complete Ticket"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* User Feedback Form */}
        {canProvideFeedback && (
          <div className="bg-[#181c2a]/90 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Was your issue resolved?</h2>
            <div className="space-y-4">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Optional: Add any additional comments..."
                className="w-full bg-[#232946] border border-gray-700 rounded-lg p-4 text-white resize-none outline-none focus:border-indigo-500"
                rows={3}
              />
              <div className="flex gap-4">
                <button
                  onClick={() => handleUserFeedback(true)}
                  disabled={isSubmittingFeedback}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {isSubmittingFeedback ? "Submitting..." : "Yes, Issue Resolved"}
                </button>
                <button
                  onClick={() => handleUserFeedback(false)}
                  disabled={isSubmittingFeedback}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium"
                >
                  {isSubmittingFeedback ? "Submitting..." : "No, Issue Not Resolved"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
}
