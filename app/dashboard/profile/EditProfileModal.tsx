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

    // 1️⃣ Upload image
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    // 2️⃣ Save image URL to profile
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: uploadData.url }),
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center">
      <div className="bg-slate-300 border-slate-400 p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Edit Profile</h2>

        <div className="flex justify-center">
          <Image
            src={preview || "/avatar.png"}
            alt="Preview"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (!selected) return;
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
          }}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
