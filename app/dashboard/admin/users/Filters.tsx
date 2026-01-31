"use client";

interface FiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function Filters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: FiltersProps) {
  return (
    <div className="flex gap-4">
      <input
        placeholder="Search email"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border px-2 py-1"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border px-2 py-1"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
    </div>
  );
}
