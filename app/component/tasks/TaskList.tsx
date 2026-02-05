// // "use client";

// // import useSWR from "swr";
// // import TaskItem from "./TaskItem";

// // interface Task {
// //   _id: string;
// //   title: string;
// //   status: "todo" | "in-progress" | "done";
// // }

// // interface Props {
// //   projectId: string;
// //   initialTasks: Task[];
// // }

// // const fetcher = async (url: string) => {
// //   const res = await fetch(url);
// //   if (!res.ok) {
// //     throw new Error("Failed to fetch tasks");
// //   }
// //   return res.json();
// // };

// // export default function TaskList({ projectId, initialTasks }: Props) {
// //   const { data: tasks, error } = useSWR(
// //     `/api/projects/${projectId}/tasks`,
// //     fetcher,
// //     { fallbackData: initialTasks },
// //   );

// //   if (error) return <p className="text-red-500">Failed to load tasks</p>;

// //   if (!Array.isArray(tasks) || tasks.length === 0) {
// //     return <p>No tasks yet.</p>;
// //   }

// //   return (
// //     <div>
// //       {tasks.map((task) => (
// //         <TaskItem key={task._id} task={task} projectId={projectId} />
// //       ))}
// //     </div>
// //   );
// // }

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

// const fetcher = async (url: string): Promise<Task[]> => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Failed to fetch tasks");
//   return res.json();
// };

// export default function TaskList({ projectId, initialTasks }: Props) {
//   //   // ... inside your component
//   const { data: tasks, error } = useSWR<Task[]>(
//     `/api/projects/${projectId}/tasks`,
//     fetcher,
//     { fallbackData: initialTasks },
//   );

//   if (error) return <p className="text-red-500">Failed to load tasks</p>;

//   // Ensure safeTasks is always an array, even if the API returns an object
//   const safeTasks = Array.isArray(tasks) ? tasks : [];

//   // If tasks is empty, show a message (Optional but recommended)
//   if (safeTasks.length === 0)
//     return <p className="text-slate-500">No tasks yet.</p>;

//   const todoTasks = safeTasks.filter((t) => t.status === "todo");
//   const inProgressTasks = safeTasks.filter((t) => t.status === "in-progress");
//   const doneTasks = safeTasks.filter((t) => t.status === "done");
//   // ... rest of your JSX

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//       {/* TODO */}
//       <div>
//         <h3 className="font-bold text-slate-400 mb-2">Todo</h3>
//         {todoTasks.map((task) => (
//           <TaskItem key={task._id} task={task} projectId={projectId} />
//         ))}
//       </div>

//       {/* IN PROGRESS */}
//       <div>
//         <h3 className="font-bold text-slate-400 mb-2">In Progress</h3>
//         {inProgressTasks.map((task) => (
//           <TaskItem key={task._id} task={task} projectId={projectId} />
//         ))}
//       </div>

//       {/* DONE */}
//       <div>
//         <h3 className="font-bold text-slate-400 mb-2">Done</h3>
//         {doneTasks.map((task) => (
//           <TaskItem key={task._id} task={task} projectId={projectId} />
//         ))}
//       </div>
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

  if (error)
    return <p className="text-red-500 text-center">Failed to load tasks</p>;

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const columns = [
    { title: "Todo", status: "todo", color: "text-slate-400" },
    { title: "In Progress", status: "in-progress", color: "text-indigo-400" },
    { title: "Done", status: "done", color: "text-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {columns.map((col) => {
        const filteredTasks = safeTasks.filter((t) => t.status === col.status);

        return (
          <div key={col.status} className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h3
                className={`font-bold uppercase tracking-widest text-xs ${col.color}`}
              >
                {col.title}
              </h3>
              <span className="bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded-full">
                {filteredTasks.length}
              </span>
            </div>

            {/* Column Body */}
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-3 min-h-[150px] space-y-3">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskItem key={task._id} task={task} projectId={projectId} />
                ))
              ) : (
                <p className="text-[10px] text-slate-700 text-center mt-10 italic">
                  No tasks here
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
