// "use client";

// import { useState } from "react";

// import { mutate } from "swr";

// export default function CreateProjectForm() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("/api/projects", {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({ name, description }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError("Something went wrong");
//       } else {
//         setName(""); // clear name form input - without this Old values stay in input
//         setDescription("");
//         mutate("/api/projects"); //         // refresh projects list
//       }
//     } catch (error) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="border-slate-900 border p-5 rounded-lg">
//       <form
//         className=" flex items-center justify-center flex-col space-y-4 "
//         onSubmit={handleCreate}
//       >
//         {error && <p>{error}</p>}
//         <p>Create New Project here!</p>

//         <input
//           className="border  border-slate-900 focus:border-slate-500 focus:outline-none rounded-full   px-4 py-2"
//           type="text"
//           placeholder="Project Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <textarea
//           className="border  border-slate-900 rounded-lg focus:border-slate-500 focus:outline-none   px-4 py-2"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>

//         <div className="w-full bg-slate-900 text-white font-semibold cursor-pointer flex justify-center border border-slate-600 p-1 rounded-full mb-2 hover:bg-slate-800">
//           <button type="submit" disabled={loading}>
//             {loading ? "Creating..." : "Create Project"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { mutate } from "swr";

// export default function CreateProjectForm() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name) return setError("Name is required");
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("/api/projects", {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({ name, description }),
//       });

//       if (!res.ok) throw new Error();

//       setName("");
//       setDescription("");
//       mutate("/api/projects");
//     } catch (error) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl">
//       <form className="flex flex-col space-y-4" onSubmit={handleCreate}>
//         <div className="text-center md:text-left">
//           <h3 className="text-lg font-semibold text-slate-200">New Project</h3>
//           <p className="text-xs text-slate-500">
//             Add a new initiative to your list
//           </p>
//         </div>

//         {error && (
//           <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded">
//             {error}
//           </p>
//         )}

//         <input
//           className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-2.5 text-slate-200"
//           type="text"
//           placeholder="Project Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <textarea
//           className="w-full bg-slate-950 border border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none px-4 py-2.5 text-slate-200 min-h-[100px]"
//           placeholder="Short description..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-white text-black font-bold py-2.5 rounded-full hover:bg-slate-200 transition disabled:opacity-50 cursor-pointer"
//         >
//           {loading ? "Creating..." : "Create Project"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { mutate } from "swr";
import { X } from "lucide-react"; // Import X for a close button

export default function CreateProjectForm({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return setError("Name is required");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) throw new Error();

      mutate("/api/projects");
      onSuccess(); // 🚀 This closes the modal automatically!
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative">
      {/* Close Button for the Modal */}
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-slate-500 hover:text-white transition cursor-pointer"
      >
        <X size={20} />
      </button>

      <form className="flex flex-col space-y-5" onSubmit={handleCreate}>
        <div>
          <h3 className="text-2xl font-bold text-slate-200">New Project</h3>
          <p className="text-sm text-slate-500">Fill in the details below</p>
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-slate-200 transition"
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            className="w-full bg-slate-950 border border-slate-800 rounded-xl focus:border-indigo-500 focus:outline-none px-4 py-3 text-slate-200 min-h-[120px] transition"
            placeholder="Project description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-slate-400 hover:text-white text-sm font-medium py-2 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
