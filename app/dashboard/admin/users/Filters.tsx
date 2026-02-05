"use client";

interface FiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

// export default function Filters({
//   search,
//   status,
//   onSearchChange,
//   onStatusChange,
// }: FiltersProps) {
//   return (
//     <div className="flex gap-4">
//       <input
//         placeholder="Search email"
//         value={search}
//         onChange={(e) => onSearchChange(e.target.value)}
//         className="border px-2 py-1"
//       />

//       <select
//         value={status}
//         onChange={(e) => onStatusChange(e.target.value)}
//         className="border px-2 py-1"
//       >
//         <option value="all">All</option>
//         <option value="active">Active</option>
//         <option value="blocked">Blocked</option>
//       </select>
//     </div>
//   );
// }

export default function Filters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <input
          placeholder="Search by email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl focus:border-indigo-500 outline-none transition"
        />
      </div>

      <div className="w-full sm:w-48">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-4 py-2.5 rounded-xl focus:border-indigo-500 outline-none transition cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active Only</option>
          <option value="blocked">Blocked Only</option>
        </select>
      </div>
    </div>
  );
}
