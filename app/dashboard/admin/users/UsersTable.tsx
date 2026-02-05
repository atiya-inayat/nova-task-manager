// "use client";

// import React from "react";
// import { mutate } from "swr";

// interface User {
//   _id: string;
//   email: string;
//   role: string;
//   isBlocked: boolean;
// }

// interface Props {
//   users: User[];
//   loading: boolean;
//   query: string; // REQUIRED now (important)
// }

// export default function UsersTable({ users, loading, query }: Props) {
//   if (loading) return <p>Loading users...</p>;
//   if (!users.length) return <p>No users found.</p>;

//   const toggleBlock = async (userId: string, currentStatus: boolean) => {
//     const newStatus = !currentStatus;

//     /* ---------------- Optimistic update (users list) ---------------- */
//     mutate(
//       query,
//       (data: any) => ({
//         ...data,
//         users: data.users.map((u: User) =>
//           u._id === userId ? { ...u, isBlocked: newStatus } : u,
//         ),
//       }),
//       false,
//     );

//     /* ---------------- Optimistic update (stats) ---------------- */
//     mutate(
//       "/api/admin/stats",
//       (stats: any) => {
//         if (!stats) return stats;

//         return {
//           ...stats,
//           activeUsers: newStatus
//             ? stats.activeUsers - 1
//             : stats.activeUsers + 1,
//           blockedUsers: newStatus
//             ? stats.blockedUsers + 1
//             : stats.blockedUsers - 1,
//         };
//       },
//       false,
//     );

//     try {
//       const res = await fetch(`/api/admin/users/${userId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isBlocked: newStatus }),
//       });

//       if (!res.ok) throw new Error("Failed to update user");

//       /* ---------------- Revalidate after success ---------------- */
//       mutate(query);
//       mutate("/api/admin/stats");
//     } catch (error) {
//       console.error(error);

//       /* ---------------- Rollback on failure ---------------- */
//       mutate(query);
//       mutate("/api/admin/stats");
//     }
//   };

//   return (
//     <table className="w-full border border-gray-300 rounded">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="p-2 border">Email</th>
//           <th className="p-2 border">Role</th>
//           <th className="p-2 border">Status</th>
//           <th className="p-2 border">Action</th>
//         </tr>
//       </thead>

//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id} className="text-center">
//             <td className="p-2 border">{user.email}</td>
//             <td className="p-2 border">{user.role}</td>
//             <td className="p-2 border">
//               {user.isBlocked ? (
//                 <span className="text-red-600 font-semibold">Blocked</span>
//               ) : (
//                 <span className="text-green-600 font-semibold">Active</span>
//               )}
//             </td>
//             <td className="p-2 border">
//               <button
//                 onClick={() => toggleBlock(user._id, user.isBlocked)}
//                 className={`px-3 py-1 rounded ${
//                   user.isBlocked
//                     ? "bg-green-200 hover:bg-green-300"
//                     : "bg-red-200 hover:bg-red-300"
//                 }`}
//               >
//                 {user.isBlocked ? "Unblock" : "Block"}
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

"use client";

import React from "react";
import { mutate } from "swr";

interface User {
  _id: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

interface Props {
  users: User[];
  loading: boolean;
  query: string;
}

export default function UsersTable({ users, loading, query }: Props) {
  if (loading && !users.length)
    return (
      <p className="text-center py-10 text-slate-500">Updating records...</p>
    );
  if (!users.length)
    return <p className="text-center py-10 text-slate-500">No users found.</p>;

  const toggleBlock = async (userId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    /* 1. Optimistic update for the Users List */
    mutate(
      query,
      (data: any) => ({
        ...data,
        users: data.users.map((u: User) =>
          u._id === userId ? { ...u, isBlocked: newStatus } : u,
        ),
      }),
      false, // false means "don't re-fetch from server immediately"
    );

    /* 2. Optimistic update for the Stats Cards */
    mutate(
      "/api/admin/stats",
      (stats: any) => {
        if (!stats) return stats;
        return {
          ...stats,
          activeUsers: newStatus
            ? stats.activeUsers - 1
            : stats.activeUsers + 1,
          blockedUsers: newStatus
            ? stats.blockedUsers + 1
            : stats.blockedUsers - 1,
        };
      },
      false,
    );

    try {
      // 3. Make the actual API call
      // IMPORTANT: Ensure this URL matches your backend route exactly!
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      /* 4. Success! Refresh everything to be safe */
      mutate(query);
      mutate("/api/admin/stats");
    } catch (error) {
      console.error("Update failed:", error);
      /* 5. Rollback: If API fails, refresh to get original data back */
      mutate(query);
      mutate("/api/admin/stats");
      alert("Could not update user status.");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider">
          <tr>
            <th className="p-4 font-semibold">User Email</th>
            <th className="p-4 font-semibold text-center">Role</th>
            <th className="p-4 font-semibold text-center">Status</th>
            <th className="p-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {users.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-slate-800/30 transition-colors"
            >
              <td className="p-4 text-slate-200 font-medium text-sm md:text-base">
                {user.email}
              </td>
              <td className="p-4 text-center">
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-800 text-slate-400 uppercase">
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-center">
                {user.isBlocked ? (
                  <span className="text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
                    Blocked
                  </span>
                ) : (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                    Active
                  </span>
                )}
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => toggleBlock(user._id, user.isBlocked)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    user.isBlocked
                      ? "border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10"
                      : "border-red-500/50 text-red-500 hover:bg-red-500/10"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block User"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
