"use client";

import useSWR, { mutate } from "swr";
import ProjectDetail from "./ProjectDetail";
import { Trash2 } from "lucide-react";

// Define what a Project looks like
interface Project {
  _id: string;
  name: string;
  description?: string;
  owner?: { email: string };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectListClient() {
  const { data: projects, error } = useSWR<Project[]>(
    "/api/projects",
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) return <p className="text-red-500">Failed to load projects</p>;
  if (!projects) return <p>Loading...</p>;
  if (projects.length === 0)
    return <p className="text-gray-500">No Project yet. Create One...</p>;

  async function deleteProject(idToDelete: string) {
    if (!confirm("Are you sure?")) return;

    const options = {
      // This function defines what the data should look like AFTER the change
      optimisticData: projects?.filter((p) => p._id !== idToDelete),
      // Whether to fetch from the server again after the call
      revalidate: true,
      // If the server returns an error, roll back to the previous data
      rollbackOnError: true,
    };

    // 2. Call mutate with the promise
    // The first argument is the key, the second is the promise (the fetch),
    // and the third is our options object.
    await mutate(
      "/api/projects",
      fetch(`/api/projects/${idToDelete}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return options.optimisticData; // Return the expected new data
      }),
      options,
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl mb-4 text-slate-300">All Projects</h1>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3">
        {projects.map((project) => (
          <div
            className="border border-slate-800 bg-slate-950 p-2 rounded-md mb-2 shadow-sm"
            key={project._id}
          >
            <h2 className="text-slate-200 mx-1 my-1  font-bold">
              Name: {project.name}
            </h2>
            <div className="text-slate-400  mx-1 my-1 text-xs">
              {project.description && <p>Description: {project.description}</p>}
              <p className="font-semibold">
                Owner: {project.owner?.email || "you"}
              </p>
            </div>

            <div className="flex justify-between items-center mt-2">
              <ProjectDetail projectId={project._id} />
              <button
                onClick={() => deleteProject(project._id)} // Fixed wrapper
                className="  py-1 px-2 "
              >
                <Trash2 className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-800" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
