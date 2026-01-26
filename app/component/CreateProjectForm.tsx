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
    <div className="">
      <form
        className=" flex items-center justify-center flex-col space-y-4 "
        onSubmit={handleCreate}
      >
        {error && <p>{error}</p>}
        <p>Create New Project here!</p>

        <input
          className="border  border-gray-200 rounded-md px-2 py-1"
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border  border-gray-200 rounded-md px-2 py-1"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="w-full bg-black text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-md mb-2">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
