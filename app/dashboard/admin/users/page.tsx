"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import StatsCards from "./StatsCards";
import Filters from "./Filters";
import UsersTable from "../UsersTable";

const LIMIT = 10;

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [skip, setSkip] = useState(0);

  const query = `/api/admin/users?search=${search}&status=${status}&limit=${LIMIT}&skip=${skip}`;

  const { data, isLoading } = useSWR(query, fetcher);

  const users = data?.users || [];
  const hasMore = data?.hasMore;

  return (
    <div className="space-y-6">
      <StatsCards />

      <Filters
        search={search}
        status={status}
        onSearchChange={(v) => {
          setSkip(0);
          setSearch(v);
        }}
        onStatusChange={(v) => {
          setSkip(0);
          setStatus(v);
        }}
      />

      <UsersTable users={users} loading={isLoading} />

      {hasMore && (
        <button
          onClick={() => setSkip((prev) => prev + LIMIT)}
          className="px-4 py-2 border"
        >
          Load More
        </button>
      )}
    </div>
  );
}
