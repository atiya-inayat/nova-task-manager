// "use client";

// import useSWR from "swr";
// import TaskItem from "./TaskItem";

// interface Task {
//   _id: string;
//   title: string;
//   status: "todo" | "in-progress" | "done";
// }

// interface Props {
//   projectId: string;
//   initialTasks: Task[];
// }

// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error("Failed to fetch tasks");
//   }
//   return res.json();
// };

// export default function TaskList({ projectId, initialTasks }: Props) {
//   const { data: tasks, error } = useSWR(
//     `/api/projects/${projectId}/tasks`,
//     fetcher,
//     { fallbackData: initialTasks },
//   );

//   if (error) return <p className="text-red-500">Failed to load tasks</p>;

//   if (!Array.isArray(tasks) || tasks.length === 0) {
//     return <p>No tasks yet.</p>;
//   }

//   return (
//     <div>
//       {tasks.map((task) => (
//         <TaskItem key={task._id} task={task} projectId={projectId} />
//       ))}
//     </div>
//   );
// }

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

const fetcher = async (url: string): Promise<Task[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export default function TaskList({ projectId, initialTasks }: Props) {
  const { data: tasks, error } = useSWR<Task[]>(
    `/api/projects/${projectId}/tasks`,
    fetcher,
    { fallbackData: initialTasks },
  );

  if (error) return <p className="text-red-500">Failed to load tasks</p>;

  const safeTasks = tasks ?? [];

  const todoTasks = safeTasks.filter((t) => t.status === "todo");
  const inProgressTasks = safeTasks.filter((t) => t.status === "in-progress");
  const doneTasks = safeTasks.filter((t) => t.status === "done");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {/* TODO */}
      <div>
        <h3 className="font-bold mb-2">Todo</h3>
        {todoTasks.map((task) => (
          <TaskItem key={task._id} task={task} projectId={projectId} />
        ))}
      </div>

      {/* IN PROGRESS */}
      <div>
        <h3 className="font-bold mb-2">In Progress</h3>
        {inProgressTasks.map((task) => (
          <TaskItem key={task._id} task={task} projectId={projectId} />
        ))}
      </div>

      {/* DONE */}
      <div>
        <h3 className="font-bold mb-2">Done</h3>
        {doneTasks.map((task) => (
          <TaskItem key={task._id} task={task} projectId={projectId} />
        ))}
      </div>
    </div>
  );
}
