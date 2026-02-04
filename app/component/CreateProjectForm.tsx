"use client";

import { useState } from "react";

import { mutate } from "swr";

export default function CreateProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Something went wrong");
      } else {
        setName(""); // clear name form input - without this Old values stay in input
        setDescription("");
        mutate("/api/projects"); //         // refresh projects list
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-slate-900 border p-5 rounded-lg">
      <form
        className=" flex items-center justify-center flex-col space-y-4 "
        onSubmit={handleCreate}
      >
        {error && <p>{error}</p>}
        <p>Create New Project here!</p>

        <input
          className="border  border-slate-900 focus:border-slate-500 focus:outline-none rounded-full   px-4 py-2"
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border  border-slate-900 rounded-lg focus:border-slate-500 focus:outline-none   px-4 py-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="w-full bg-slate-900 text-white font-semibold cursor-pointer flex justify-center border border-slate-600 p-1 rounded-full mb-2 hover:bg-slate-800">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
