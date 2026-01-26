"use client";

import { useState } from "react";
import { mutate } from "swr";

interface Props {
  projectId: string;
}

export default function TaskForm({ projectId }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function createTask(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    setLoading(true);

    await fetch(`/api/projects/${projectId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    setLoading(false);

    // 🔁 refresh task list
    mutate(`/api/projects/${projectId}/tasks`);
  }

  return (
    <div>
      <div className=" mt-3 flex  gap-3 ">
        <form
          className="flex justify-center gap-3 items-center"
          onSubmit={createTask}
          style={{ marginBottom: "16px" }}
        >
          <input
            className="border border-gray-200 px-2 py-1 rounded-md"
            type="text"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className=" bg-black text-white font-semibold cursor-pointer flex justify-center border py-1 px-2 rounded-md mb-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
