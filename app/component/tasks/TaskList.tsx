"use client";

import useSWR from "swr";
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

interface Props {
  projectId: string;
  initialTasks: Task[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
};

export default function TaskList({ projectId, initialTasks }: Props) {
  const { data: tasks, error } = useSWR(
    `/api/projects/${projectId}/tasks`,
    fetcher,
    { fallbackData: initialTasks },
  );

  if (error) return <p className="text-red-500">Failed to load tasks</p>;

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} projectId={projectId} />
      ))}
    </div>
  );
}
