"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export default function StatsCards() {
  const { data, isLoading, error } = useSWR("/api/admin/stats", fetcher);

  if (isLoading) {
    return <p>Loading stats...</p>;
  }

  if (error) {
    return <p>Failed to load stats</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>Total Users: {data.totalUsers}</div>
      <div>Active Users: {data.activeUsers}</div>
      <div>Blocked Users: {data.blockedUsers}</div>
    </div>
  );
}
