"use client";

import { mutate } from "swr";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

interface Props {
  task: Task;
  projectId: string;
}

export default function TaskItem({ task, projectId }: Props) {
  async function updateStatus(status: Task["status"]) {
    await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    // refresh task list
    mutate(`/api/projects/${projectId}/tasks`);
  }

  async function deleteTask() {
    await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });
    mutate(`/api/projects/${projectId}/tasks`);
  }

  return (
    <div>
      <p>{task.title}</p>
      <select
        value={task.status}
        onChange={(e) => updateStatus(e.target.value as Task["status"])}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}
