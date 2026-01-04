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
    <form onSubmit={createTask} style={{ marginBottom: "16px" }}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
