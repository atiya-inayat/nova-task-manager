import Image from "next/image";

// export default function ProfileHeader({ user }: { user: any }) {
//   // 🔒 Protect next/image from invalid or external URLs
//   const imageSrc =
//     user?.image &&
//     (user.image.startsWith("/") ||
//       user.image.startsWith("https://res.cloudinary.com"))
//       ? user.image
//       : "/avatar.png";

//   return (
//     <div className="flex items-center max-w-md mx-auto flex-col justify-center  gap-4 p-6 border border-slate-700 rounded-xl shadow-sm bg-slate-900 ">
//       <div className="relative w-40 h-40  ">
//         <Image
//           src={imageSrc}
//           alt="Profile"
//           fill
//           sizes="80px"
//           className="rounded-full object-cover cursor-pointer "
//           priority
//         />
//       </div>

//       <div className="flex justify-center flex-col items-center ">
//         <p className="text-lg text-slate-300 font-semibold">{user.email}</p>

//         <span
//           className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
//             user.role === "admin"
//               ? "bg-slate-700 text-slate-300 font-bold"
//               : "bg-slate-700 text-green-500"
//           }`}
//         >
//           {user.role?.toUpperCase()}
//         </span>
//       </div>
//     </div>
//   );
// }
// ProfileHeader.tsx
export default function ProfileHeader({ user }: { user: any }) {
  const imageSrc =
    user?.image?.startsWith("http") || user?.image?.startsWith("/")
      ? user.image
      : "/avatar.png";

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-slate-800 rounded-full overflow-hidden shadow-2xl">
        <Image
          src={imageSrc}
          alt="Profile"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="text-center">
        <p className="text-xl text-slate-200 font-bold">{user.email}</p>
        <span className="inline-block mt-2 px-4 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
          {user.role}
        </span>
      </div>
    </div>
  );
}
