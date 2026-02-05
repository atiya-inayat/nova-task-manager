import TaskForm from "@/app/component/tasks/TaskForm";
import TaskList from "@/app/component/tasks/TaskList";

// // Notice the 'async' keyword here
// interface Props {
//   params: Promise<{ projectId: string }>;
// }

// export default async function ProjectDetailPage({ params }: Props) {
//   // You must await the params before using them
//   const { projectId } = await params;

//   const res = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/projects/${projectId}/tasks`,
//     {
//       cache: "no-store",
//     },
//   );

//   const tasks = await res.json();

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black pt-20 pb-10 px-4">
//       <div className="mx-auto max-w-3xl">
//         <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
//           {/* Heading */}
//           <h1 className="mb-4 text-center text-4xl font-extrabold text-white">
//             Project Detail
//           </h1>

//           <div className="rounded-xl border border-slate-900 p-4 space-y-6">
//             {/* Create Task */}
//             <div className="text-center">
//               <p className="font-bold text-white">Create Task</p>
//               <TaskForm projectId={projectId} />
//             </div>

//             {/* Task List */}
//             <TaskList initialTasks={tasks} projectId={projectId} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { projectId } = await params;

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/projects/${projectId}/tasks`,
    { cache: "no-store" },
  );

  const tasks = await res.json();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black pt-24 pb-12 px-4">
      {/* Container widened for Kanban columns */}
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 md:p-8 backdrop-blur-sm">
          {/* Heading */}
          <h1 className="mb-8 text-center text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Project Dashboard
          </h1>

          <div className="space-y-10">
            {/* Create Task Section */}
            <div className="flex flex-col items-center">
              <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Quick Add
              </h2>
              <TaskForm projectId={projectId} />
            </div>

            {/* Kanban Task List */}
            <TaskList initialTasks={tasks} projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
