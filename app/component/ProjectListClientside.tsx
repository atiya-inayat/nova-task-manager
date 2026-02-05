"use client";
import { useState } from "react"; // Added useState
import useSWR, { mutate } from "swr";
import ProjectDetail from "./ProjectDetail";
import { Trash2, AlertTriangle, X } from "lucide-react"; // Added more icons

interface Project {
  _id: string;
  name: string;
  description?: string;
  owner?: { email: string };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProjectListClient() {
  const { data: projects, error } = useSWR<Project[]>("/api/projects", fetcher);

  // 1. State for handling the modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load projects
      </div>
    );
  if (!projects)
    return (
      <div className="text-center py-10 text-slate-500">
        Loading workspace...
      </div>
    );
  if (projects.length === 0)
    return (
      <div className="text-center py-10 text-slate-600">No projects found.</div>
    );

  // 2. The actual delete logic
  async function confirmDelete() {
    if (!deletingId) return;

    setIsDeleting(true);
    const idToDelete = deletingId;

    const options = {
      optimisticData: projects?.filter((p) => p._id !== idToDelete),
      revalidate: true,
      rollbackOnError: true,
    };

    try {
      await mutate(
        "/api/projects",
        fetch(`/api/projects/${idToDelete}`, { method: "DELETE" }).then(
          (res) => {
            if (!res.ok) throw new Error();
            return options.optimisticData;
          },
        ),
        options,
      );
      setDeletingId(null); // Close modal on success
    } catch (err) {
      alert("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-slate-300 text-center md:text-left">
        Your Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="group border border-slate-800 bg-slate-900/50 p-5 rounded-2xl hover:border-slate-600 transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="text-slate-100 font-bold text-lg mb-2 truncate">
                {project.name}
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                {project.description || "No description provided."}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Owner
                </span>
                <span className="text-xs text-indigo-400 truncate max-w-[120px]">
                  {project.owner?.email || "You"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ProjectDetail projectId={project._id} />
                <button
                  onClick={() => setDeletingId(project._id)} // Open modal
                  className="p-2 hover:bg-red-500/10 rounded-lg group/trash transition cursor-pointer"
                >
                  <Trash2 className="w-5 h-5 text-slate-500 group-hover/trash:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. CUSTOM CONFIRMATION MODAL */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setDeletingId(null)}
          />

          <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertTriangle className="text-red-500 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Project?</h3>
            </div>

            <p className="text-slate-400 text-sm mb-6">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-750 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
