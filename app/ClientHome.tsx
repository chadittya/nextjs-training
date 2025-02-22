"use client";

import { useState } from "react";
import About from "@/components/About";
import Header from "@/components/Header";
import { Project } from "@/types";

export default function ClientHome({ projects }: { projects: Project[] }) {
  const [isDark, setIsDark] = useState(false);

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
