"use client";

import ProjectDetail from "./ProjectDetail";

export default function ProjectList({ projects }: { projects: any[] }) {
  if (!projects.length) {
    return <p className="text-gray-500">No Project yet. Create One...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h2 className="font-bold">Your Projects.</h2>
      </div>
      <div className=" border border-gray-200 rounded-md px-3 py-2 ">
        {projects.map((project) => (
          <div
            className="border border-gray-200 p-1 rounded-md mb-2 "
            key={project._id}
          >
            <h2 className="text-gray-700 text-sm">Name: {project.name}</h2>
            <div className="text-gray-700 text-sm">
              {project.description && <p>Description: {project.description}</p>}
            </div>
            <p className="text-gray-700 text-sm">
              Owner: {project.owner?.email || "you"}
            </p>
            <div>
              <ProjectDetail projectId={project._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
