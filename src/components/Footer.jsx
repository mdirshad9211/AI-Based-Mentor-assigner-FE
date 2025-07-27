
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#181c2a] border-t border-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 text-2xl font-extrabold tracking-tight">AI Ticket Assistant</span>
        </div>
        <div className="flex flex-wrap gap-6 text-gray-400 text-sm font-medium">
          <a href="/" className="hover:text-indigo-400 transition">Home</a>
          <a href="/about" className="hover:text-indigo-400 transition">About</a>
          <a href="/contact" className="hover:text-indigo-400 transition">Contact</a>
          <a href="/all-tickets" className="hover:text-indigo-400 transition">Tickets</a>
        </div>
        <div className="text-gray-500 text-xs mt-2 md:mt-0">
          &copy; {new Date().getFullYear()} AI Ticket Assistant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
