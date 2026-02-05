// "use client";

// import { useState } from "react";
// import Image from "next/image";

// export default function EditProfileModal({
//   user,
//   onClose,
// }: {
//   user: any;
//   onClose: () => void;
// }) {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState(user.image);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!file) return;

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", file);

//     // 1️⃣ Upload image
//     const uploadRes = await fetch("/api/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const uploadData = await uploadRes.json();

//     // 2️⃣ Save image URL to profile
//     await fetch("/api/profile", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ image: uploadData.url }),
//     });

//     setLoading(false);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center">
//       <div className="bg-slate-300 border-slate-400 p-6 rounded-xl w-full max-w-md space-y-4">
//         <h2 className="text-lg font-semibold">Edit Profile</h2>

//         <div className="flex justify-center">
//           <Image
//             src={preview || "/avatar.png"}
//             alt="Preview"
//             width={120}
//             height={120}
//             className="rounded-full object-cover"
//           />
//         </div>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             const selected = e.target.files?.[0];
//             if (!selected) return;
//             setFile(selected);
//             setPreview(URL.createObjectURL(selected));
//           }}
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2">
//             Cancel
//           </button>
//           <button
//             onClick={handleUpload}
//             disabled={loading}
//             className="bg-black text-white px-4 py-2 rounded"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Image from "next/image";

export default function EditProfileModal({
  user,
  onClose,
}: {
  user: any;
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.image);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const uploadData = await uploadRes.json();

    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: uploadData.url }),
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-slate-200 rounded-2xl p-6 w-full max-w-md space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-slate-900">
          Edit Profile Picture
        </h2>

        <div className="flex justify-center">
          <div className="relative w-32 h-32 border-4 border-white rounded-full overflow-hidden shadow-lg">
            <Image
              src={preview || "/avatar.png"}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (!selected) return;
              setFile(selected);
              setPreview(URL.createObjectURL(selected));
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 text-slate-600 font-semibold hover:bg-slate-300 rounded-xl transition cursor-pointer order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer order-1 sm:order-2"
          >
            {loading ? "Uploading..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
