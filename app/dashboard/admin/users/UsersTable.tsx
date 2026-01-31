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
  query: string; // REQUIRED now (important)
}

export default function UsersTable({ users, loading, query }: Props) {
  if (loading) return <p>Loading users...</p>;
  if (!users.length) return <p>No users found.</p>;

  const toggleBlock = async (userId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    /* ---------------- Optimistic update (users list) ---------------- */
    mutate(
      query,
      (data: any) => ({
        ...data,
        users: data.users.map((u: User) =>
          u._id === userId ? { ...u, isBlocked: newStatus } : u,
        ),
      }),
      false,
    );

    /* ---------------- Optimistic update (stats) ---------------- */
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
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      /* ---------------- Revalidate after success ---------------- */
      mutate(query);
      mutate("/api/admin/stats");
    } catch (error) {
      console.error(error);

      /* ---------------- Rollback on failure ---------------- */
      mutate(query);
      mutate("/api/admin/stats");
    }
  };

  return (
    <table className="w-full border border-gray-300 rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="text-center">
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.role}</td>
            <td className="p-2 border">
              {user.isBlocked ? (
                <span className="text-red-600 font-semibold">Blocked</span>
              ) : (
                <span className="text-green-600 font-semibold">Active</span>
              )}
            </td>
            <td className="p-2 border">
              <button
                onClick={() => toggleBlock(user._id, user.isBlocked)}
                className={`px-3 py-1 rounded ${
                  user.isBlocked
                    ? "bg-green-200 hover:bg-green-300"
                    : "bg-red-200 hover:bg-red-300"
                }`}
              >
                {user.isBlocked ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
