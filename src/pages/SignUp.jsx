


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp
(){

const roles = ["user", "moderator", "admin"];


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(roles[0]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (idx) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate skills for moderator role
    if (role === "moderator" && skills.length === 0) {
      setError("Skills are required for moderators");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://ai-based-mentor-assigner-be.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, skills }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }
      
      // Store token and user info in localStorage (auto-login after signup)
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("isLoggedIn", "true");
      
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.user.role === "moderator") {
          navigate("/moderator-dashboard");
        } else {
          navigate("/all-tickets");
        }
      }, 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#161b22] to-[#232946] py-12 px-2">
      <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#181c2a]/90 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left info panel */}
          <div className="relative px-10 py-14 flex flex-col justify-between min-h-[500px] bg-gradient-to-br from-[#232946]/80 via-[#232946]/60 to-[#181c2a]/80">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-6">Create your account</h2>
              <p className="text-gray-300 mb-10 max-w-md">Sign up to get started! Choose your role, add your skills, and join our platform to unlock new opportunities.</p>
              <ul className="space-y-6 text-white/80 text-base">
                <li><span className="font-semibold text-indigo-400">•</span> Access exclusive features</li>
                <li><span className="font-semibold text-indigo-400">•</span> Connect with other users and moderators</li>
                <li><span className="font-semibold text-indigo-400">•</span> Showcase your skills</li>
              </ul>
            </div>
          </div>
          {/* Right form panel */}
          <div className="bg-[#181c2a]/80 px-10 py-14 flex items-center">
            <form className="w-full max-w-lg mx-auto space-y-6" onSubmit={handleSubmit}>
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
                  autoComplete="new-password"
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
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-white mb-2">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                >
                  {roles.map(r => (
                    <option key={r} value={r} className="bg-[#232946] text-white">{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-semibold text-white mb-2">
                  Skills {role === "moderator" && <span className="text-red-400">*</span>}
                </label>
                {role === "moderator" && (
                  <p className="text-xs text-gray-400 mb-2">Skills are required for moderators to enable auto-assignment</p>
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-indigo-600 text-white rounded-full px-3 py-1 flex items-center text-sm font-medium">
                      {skill}
                      <button type="button" onClick={() => removeSkill(idx)} className="ml-2 text-white hover:text-pink-300 font-bold text-base leading-none" aria-label="Remove skill">×</button>
                    </span>
                  ))}
                </div>
                <input
                  id="skills"
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter (e.g., React JS, Node JS, Python)"
                  className="block w-full rounded-md border border-gray-700 bg-[#232946] text-white px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none"
                />
              </div>
              {error && <div className="text-red-400 text-center font-semibold">{error}</div>}
              {success && <div className="text-green-400 text-center font-semibold">{success}</div>}
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-6 py-2 text-white font-semibold shadow hover:bg-indigo-600 transition w-full disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              <div className="text-center text-white/80 mt-4 text-base">
                Already have an account? <a href="/login" className="text-indigo-400 underline hover:text-indigo-300 font-semibold">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );  
}

