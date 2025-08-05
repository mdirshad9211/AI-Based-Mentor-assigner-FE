
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("isLoggedIn", "true"); // For backward compatibility
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/all-tickets");
        }
      }, 1200);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-2">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#181c2a]/90 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left info panel */}
          <div className="relative px-10 py-14 flex flex-col justify-between min-h-[400px] bg-gradient-to-br from-[#232946]/80 via-[#232946]/60 to-[#181c2a]/80">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-6">Welcome Back</h2>
              <p className="text-gray-300 mb-10 max-w-md">Login to your account to access your dashboard, manage your tickets, and connect with the community.</p>
              <ul className="space-y-6 text-white/80 text-base">
                <li><span className="font-semibold text-indigo-400">•</span> Secure access to your profile</li>
                <li><span className="font-semibold text-indigo-400">•</span> Manage your tickets and skills</li>
                <li><span className="font-semibold text-indigo-400">•</span> Stay connected</li>
              </ul>
            </div>
          </div>
          {/* Right form panel */}
          <div className="bg-[#181c2a]/80 px-10 py-14 flex items-center">
            <form className="w-full max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-9 text-indigo-400 hover:text-indigo-300 text-lg focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {error && <div className="text-red-400 text-center font-semibold">{error}</div>}
              {success && <div className="text-green-400 text-center font-semibold">{success}</div>}
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-600 transition w-full disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="text-center text-white/80 mt-4 text-base">
                Don't have an account? <a href="/signup" className="text-indigo-400 underline hover:text-indigo-300 font-semibold">Sign Up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
