// import { useState } from "react";
// import { signOut } from "next-auth/react";

// const DeleteAccountModal = ({
//   user,
//   onClose,
// }: {
//   user: any;
//   onClose: () => void;
// }) => {
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleDelete = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch("/api/profile", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Failed to delete account");
//         return;
//       }

//       await signOut({ callbackUrl: "/" });
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-amber-400  flex items-center justify-center z-50">
//       <div className="bg-linear-to-br from-[#0F172A] to-black rounded-xl p-6 w-full max-w-md space-y-4">
//         <h2 className="text-lg font-semibold text-red-600">Delete Account</h2>

//         <p className="text-sm text-gray-600">
//           This will permanently delete your account and all associated data.
//         </p>

//         {user.provider === "credentials" && (
//           <div>
//             <label className="text-sm">Enter your password to confirm</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border rounded-lg p-2 mt-1"
//             />
//           </div>
//         )}

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="flex justify-end gap-2 pt-4">
//           <button onClick={onClose}>Cancel</button>
//           <button
//             onClick={handleDelete}
//             disabled={loading}
//             className="bg-red-600 text-white px-4 py-2 rounded-lg"
//           >
//             {loading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteAccountModal;

"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

const DeleteAccountModal = ({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/profile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to delete account");
        return;
      }
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-red-950/40 backdrop-blur-md z-50 flex items-center justify-center px-4">
      <div className="bg-slate-900 border border-red-900/50 rounded-2xl p-6 w-full max-w-md space-y-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-900/20 text-red-500 mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-white">Delete Account?</h2>
          <p className="text-sm text-slate-400 mt-2">
            This will permanently remove all your projects and data. This action
            is irreversible.
          </p>
        </div>

        {user.provider === "credentials" && (
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Confirm with Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-red-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-900/20">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Deleting Account..." : "Yes, Delete Everything"}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-slate-400 font-semibold hover:text-white transition cursor-pointer"
          >
            I changed my mind
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
