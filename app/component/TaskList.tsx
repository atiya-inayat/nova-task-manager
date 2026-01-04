"use client";

interface Task {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
}

interface Props {
  tasks: Task[];
  projectId: string;
}

export default function TaskList({ tasks, projectId }: Props) {
  if (!tasks.length) {
    return <p>No tasks yet</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={tasks._id} task={task} projectId={projectId} />
      ))}
    </div>
  );
}
