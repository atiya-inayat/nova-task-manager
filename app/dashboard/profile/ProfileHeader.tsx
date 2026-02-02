import Image from "next/image";

export default function ProfileHeader({ user }: { user: any }) {
  return (
    <div className="flex items-center gap-4 p-6 rounded-xl shadow-sm bg-white">
      <div className="relative w-20 h-20">
        <Image
          src={user.image || "/avatar.png"}
          alt="Profile"
          fill
          className="rounded-full object-cover"
          sizes="80px"
        />
      </div>

      <div>
        <p className="text-lg font-semibold">{user.email}</p>

        <span
          className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {user.role.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
