"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

// export default function StatsCards() {
//   const { data, isLoading, error } = useSWR("/api/admin/stats", fetcher);

//   if (isLoading) {
//     return <p>Loading stats...</p>;
//   }

//   if (error) {
//     return <p>Failed to load stats</p>;
//   }

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       <div>Total Users: {data.totalUsers}</div>
//       <div>Active Users: {data.activeUsers}</div>
//       <div>Blocked Users: {data.blockedUsers}</div>
//     </div>
//   );
// }

export default function StatsCards() {
  const { data, isLoading, error } = useSWR("/api/admin/stats", fetcher);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-slate-900 rounded-2xl border border-slate-800"
          />
        ))}
      </div>
    );

  const stats = [
    { label: "Total Users", value: data?.totalUsers, color: "text-slate-200" },
    { label: "Active", value: data?.activeUsers, color: "text-emerald-400" },
    { label: "Blocked", value: data?.blockedUsers, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
            {s.label}
          </span>
          <span className={`text-3xl font-black ${s.color}`}>
            {s.value || 0}
          </span>
        </div>
      ))}
    </div>
  );
}
