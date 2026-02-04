// "use client";

// import ProjectDetail from "./ProjectDetail";

// export default function ProjectList({ projects }: { projects: any[] }) {
//   if (!projects.length) {
//     return <p className="text-gray-500">No Project yet. Create One...</p>;
//   }

//   return (
//     <div className=" bg-linear-to-br from-[#0F172A] to-black grid w-full max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3">
//       <div>
//         <h2 className="font-bold">Your Projects.</h2>
//       </div>
//       <div className=" border border-gray-200 rounded-md px-3 py-2 ">
//         {projects.map((project) => (
//           <div
//             className="border border-gray-200 p-1 rounded-md mb-2 "
//             key={project._id}
//           >
//             <h2 className="text-gray-700 text-sm">Name: {project.name}</h2>
//             <div className="text-gray-700 text-sm">
//               {project.description && <p>Description: {project.description}</p>}
//             </div>
//             <p className="text-gray-700 text-sm">
//               Owner: {project.owner?.email || "you"}
//             </p>
//             <div>
//               <ProjectDetail projectId={project._id} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import ProjectDetail from "./ProjectDetail";

interface Project {
  _id: string;
  name: string;
  description?: string;
  owner?: { email: string };
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return (
      <p className="text-slate-400 text-sm">No Project yet. Create one...</p>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black flex flex-col items-center pt-20 pb-10">
      {/* Heading */}
      <h1 className="mb-6 text-2xl font-bold text-slate-300">Your Projects</h1>

      {/* Grid */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-md border border-slate-800 bg-slate-950 p-4 shadow-sm transition hover:border-slate-700"
          >
            <h2 className="mb-1 text-sm font-bold text-slate-200">
              {project.name}
            </h2>

            <div className="text-xs text-slate-400">
              {project.description && (
                <p className="line-clamp-2">{project.description}</p>
              )}
              <p className="mt-1 font-semibold">
                Owner: {project.owner?.email || "you"}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <ProjectDetail projectId={project._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
