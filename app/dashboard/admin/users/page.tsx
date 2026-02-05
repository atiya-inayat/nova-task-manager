// "use client";

// import { useState } from "react";
// import useSWR from "swr";
// import { fetcher } from "@/lib/fetcher";
// import StatsCards from "./StatsCards";
// import Filters from "./Filters";
// import UsersTable from "./UsersTable";

// const LIMIT = 10;

// export default function AdminUsersPage() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [skip, setSkip] = useState(0);

//   const query = `/api/admin/users?search=${search}&status=${status}&limit=${LIMIT}&skip=${skip}`;

//   const { data, isLoading } = useSWR(query, fetcher);

//   const users = data?.users || [];
//   const hasMore = data?.hasMore;

//   return (
//     <div className="space-y-6">
//       <StatsCards />

//       <Filters
//         search={search}
//         status={status}
//         onSearchChange={(v) => {
//           setSkip(0);
//           setSearch(v);
//         }}
//         onStatusChange={(v) => {
//           setSkip(0);
//           setStatus(v);
//         }}
//       />

//       <UsersTable users={users} loading={isLoading} query={query} />

//       {hasMore && (
//         <button
//           onClick={() => setSkip((prev) => prev + LIMIT)}
//           className="px-4 py-2 border"
//         >
//           Load More
//         </button>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import StatsCards from "./StatsCards";
import Filters from "./Filters";
import UsersTable from "./UsersTable";

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
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-slate-200">
            User Management
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor and control system access
          </p>
        </div>

        <StatsCards />

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-sm">
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

          <UsersTable users={users} loading={isLoading} query={query} />

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setSkip((prev) => prev + LIMIT)}
                className="px-8 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-full transition cursor-pointer font-semibold text-sm"
              >
                Load More Users
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
