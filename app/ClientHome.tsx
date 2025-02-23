"use client";

import { useState } from "react";
import About from "@/components/About";
import Header from "@/components/Header";
import { Message } from "@/types";

export default function ClientHome({
  messages: initialMessages,
}: {
  messages: Message[];
}) {
  const [isDark, setIsDark] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(initialMessages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.message);
      setMessages([data.data, ...messages]); // Add new message
      setMessage("");
    } catch (error) {
      setResponse("Oops, something went wrong!");
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleUpdate = async (id: number, content: string) => {
    const newContent = prompt("Edit message:", content);
    if (newContent) {
      try {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, content: newContent }),
        });
        const updated = await res.json();
        setMessages(messages.map((msg) => (msg.id === id ? updated : msg)));
      } catch (error) {
        setResponse("Update failed!");
        console.log(error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this message?")) {
      try {
        await fetch("/api/projects", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        setMessages(messages.filter((msg) => msg.id !== id));
      } catch (error) {
        setResponse("Delete failed!");
        console.log(error);
      }
    }
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
            disabled={isLoading}
            className={`px-4 py-2 rounded transition ${
              isDark
                ? "bg-green-700 hover:bg-green-800"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isLoading ? "Sending..." : "Send"}
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
            Messages
          </h3>
          {messages.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                >
                  {msg.content}{" "}
                  <span className="text-sm">
                    ({new Date(msg.createdAt).toLocaleString()})
                  </span>
                  <button
                    onClick={() => handleUpdate(msg.id, msg.content)}
                    className={`ml-2 px-2 py-1 text-sm rounded ${
                      isDark
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    } text-white`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className={`ml-2 px-2 py-1 text-sm rounded ${
                      isDark
                        ? "bg-red-600 hover:bg-red-800"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              No messages yet!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
