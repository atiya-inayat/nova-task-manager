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
    <div className="flex items-center max-w-md mx-auto flex-col justify-center  gap-4 p-6 border border-slate-700 rounded-xl shadow-sm bg-slate-900 ">
      <div className="relative w-40 h-40  ">
        <Image
          src={imageSrc}
          alt="Profile"
          fill
          sizes="80px"
          className="rounded-full object-cover cursor-pointer "
          priority
        />
      </div>

      <div className="flex justify-center flex-col items-center ">
        <p className="text-lg text-slate-300 font-semibold">{user.email}</p>

        <span
          className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
            user.role === "admin"
              ? "bg-slate-700 text-slate-300 font-bold"
              : "bg-slate-700 text-green-500"
          }`}
        >
          {user.role?.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
