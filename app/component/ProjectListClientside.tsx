"use client";

import useSWR, { mutate } from "swr";
import ProjectDetail from "./ProjectDetail";

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
      <h2 className="font-bold mb-4">Your Projects.</h2>
      <div className="border border-gray-200 rounded-md px-3 py-2 w-full max-w-md">
        {projects.map((project) => (
          <div
            className="border border-gray-200 p-2 rounded-md mb-2 shadow-sm"
            key={project._id}
          >
            <h2 className="text-gray-700 text-sm font-bold">
              Name: {project.name}
            </h2>
            <div className="text-gray-700 text-xs">
              {project.description && <p>Description: {project.description}</p>}
              <p>Owner: {project.owner?.email || "you"}</p>
            </div>

            <div className="flex justify-between items-center mt-2">
              <ProjectDetail projectId={project._id} />
              <button
                onClick={() => deleteProject(project._id)} // Fixed wrapper
                className="text-red-600 hover:bg-red-50 border border-gray-300 py-1 px-2 rounded-md text-xs font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
