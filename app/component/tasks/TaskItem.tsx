// // "use client";

// // import { mutate } from "swr";

// // interface Task {
// //   _id: string;
// //   title: string;
// //   status: "todo" | "in-progress" | "done";
// // }

// // interface Props {
// //   task: Task;
// //   projectId: string;
// // }

// // export default function TaskItem({ task, projectId }: Props) {
// //   async function updateStatus(status: Task["status"]) {
// //     await fetch(`/api/tasks/${task._id}`, {
// //       method: "PATCH",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ status }),
// //     });

// //     // refresh task list
// //     mutate(`/api/projects/${projectId}/tasks`);
// //   }

// //   async function deleteTask() {
// //     await fetch(`/api/tasks/${task._id}`, {
// //       method: "DELETE",
// //     });
// //     mutate(`/api/projects/${projectId}/tasks`);
// //   }

// //   return (
// //     <div>
// //       <div className=" flex flex-col border border-gray-300 rounded-md  mb-2">
// //         <div className="flex justify-center items-center">
// //           <p>{task.title}</p>
// //         </div>
// //         <div className=" flex justify-around items-center">
// //           <div>
// //             <select
// //               value={task.status}
// //               onChange={(e) => updateStatus(e.target.value as Task["status"])}
// //             >
// //               <option value="todo">Todo</option>
// //               <option value="in-progress">In Progress</option>
// //               <option value="done">Done</option>
// //             </select>
// //           </div>
// //           <button
// //             className=" bg-red-600 text-sm w-20 text-white font-semibold cursor-pointer flex justify-center border border-gray-500 py-1  rounded-md mb-2"
// //             onClick={deleteTask}
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

"use client";

import { mutate } from "swr";
import { Trash2 } from "lucide-react";

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

    // Refresh task list
    mutate(`/api/projects/${projectId}/tasks`);
  }

  async function deleteTask() {
    await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });

    mutate(`/api/projects/${projectId}/tasks`);
  }

  return (
    <div className="border  border-slate-700 rounded-md p-2 mb-2 bg-slate-800">
      <p className="font-medium text-white text-sm">{task.title}</p>

      <div className="flex justify-between gap-2 items-center mt-2">
        <select
          value={task.status}
          onChange={(e) => updateStatus(e.target.value as Task["status"])}
          className="border border-slate-700 text-slate-300 focus:border-slate-700 outline-none cursor-pointer rounded px-2 py-1 text-sm"
        >
          <option className=" text-white bg-slate-900" value="todo">
            Todo
          </option>
          <option className=" text-white bg-slate-900" value="in-progress">
            In Progress
          </option>
          <option className=" text-white bg-slate-900" value="done">
            Done
          </option>
        </select>

        <button
          onClick={deleteTask}
          className="text-red-600 cursor-pointer hover:text-red-800   py-1 px-2   text-xs font-semibold"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
