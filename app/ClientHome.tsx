"use client";

import React, { useState } from "react";
import About from "@/components/About";
import Header from "@/components/Header";
import { Project } from "@/types";

export default function ClientHome({ projects }: { projects: Project[] }) {
  const [isDark, setIsDark] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header name="Next.js Lord" isDark={isDark} />
      <main className="max-w-2xl mx-auto mt-8 space-y-6">
        <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          This is my first Next.js app. Time to crush it.
        </p>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`px-4 py-2 rounded transition ${
            isDark
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          Toggle {isDark ? "Light" : "Dark"} Mode
        </button>
        <p className={isDark ? "text-gray-400" : "text-gray-600"}>
          Mode: {isDark ? "Dark" : "Light"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className={`w-full p-2 rounded ${
              isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded transition ${
              isDark
                ? "bg-green-700 hover:bg-green-800"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            Send
          </button>
          {response && (
            <p className={isDark ? "text-green-400" : "text-green-600"}>
              {response}
            </p>
          )}
        </form>

        <About isDark={isDark} />
        <div>
          <h3
            className={`text-xl font-semibold ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Projects Preview
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {projects.map((project) => (
              <li
                key={project.id}
                className={isDark ? "text-gray-300" : "text-gray-700"}
              >
                {project.title}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
