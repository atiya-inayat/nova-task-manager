"use client";

import useSWR from "swr";
import TaskItem from "./TaskItem";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

interface Props {
  projectId: string;
  initialTasks: Task[];
}

export default function TaskList({ projectId, initialTasks }: Props) {
  const { data: tasks } = useSWR(`/api/projects/${projectId}/tasks`, fetcher, {
    fallbackData: initialTasks,
  });

  if (!tasks || tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map((task: Task) => (
        <TaskItem key={task._id} task={task} projectId={projectId} />
      ))}
    </div>
  );
}
