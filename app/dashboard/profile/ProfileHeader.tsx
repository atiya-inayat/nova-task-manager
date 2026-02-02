import Image from "next/image";

export default function ProfileHeader({ user }: { user: any }) {
  // 🔒 Protect next/image from invalid or external URLs
  const imageSrc =
    user?.image &&
    (user.image.startsWith("/") ||
      user.image.startsWith("https://res.cloudinary.com"))
      ? user.image
      : "/avatar.png";

  return (
    <div className="flex items-center gap-4 p-6 rounded-xl shadow-sm bg-white">
      <div className="relative w-20 h-20">
        <Image
          src={imageSrc}
          alt="Profile"
          fill
          sizes="80px"
          className="rounded-full object-cover"
          priority
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
          {user.role?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
