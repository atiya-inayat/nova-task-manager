"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ProfileHeader from "./ProfileHeader";
import AccountSettings from "./AccountSettings";
import DeleteAccount from "./DeleteAccount";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

import DeleteAccountModal from "./DeleteAccountModal";
import { useState } from "react";

// export default function ProfilePage() {
//   const { data: user, error, isLoading } = useSWR("/api/profile", fetcher);

//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isPasswordOpen, setIsPasswordOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);

//   if (isLoading) return <div className="p-6">Loading profile...</div>;
//   if (error)
//     return <div className="p-6 text-red-500">Failed to load profile</div>;

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black pt-20 pb-10 px-4">
//       <div className="max-w-3xl mx-auto space-y-8">
//         <ProfileHeader user={user} />

//         <AccountSettings
//           user={user}
//           onEditProfile={() => setIsEditOpen(true)}
//           onChangePassword={() => setIsPasswordOpen(true)}
//         />

//         <DeleteAccount onDelete={() => setIsDeleteOpen(true)} />

//         {isEditOpen && (
//           <EditProfileModal user={user} onClose={() => setIsEditOpen(false)} />
//         )}

//         {isPasswordOpen && (
//           <ChangePasswordModal onClose={() => setIsPasswordOpen(false)} />
//         )}

//         {isDeleteOpen && (
//           <DeleteAccountModal
//             user={user}
//             onClose={() => setIsDeleteOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

export default function ProfilePage() {
  const { data: user, error, isLoading } = useSWR("/api/profile", fetcher);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  if (isLoading)
    return (
      <div className="p-10 text-slate-400 text-center">Loading profile...</div>
    );
  if (error)
    return (
      <div className="p-10 text-red-500 text-center">
        Failed to load profile
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black pt-24 pb-16 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <ProfileHeader user={user} />

        <AccountSettings
          user={user}
          onEditProfile={() => setIsEditOpen(true)}
          onChangePassword={() => setIsPasswordOpen(true)}
        />

        <DeleteAccount onDelete={() => setIsDeleteOpen(true)} />

        {/* Modals are handled below */}
        {isEditOpen && (
          <EditProfileModal user={user} onClose={() => setIsEditOpen(false)} />
        )}
        {isPasswordOpen && (
          <ChangePasswordModal onClose={() => setIsPasswordOpen(false)} />
        )}
        {isDeleteOpen && (
          <DeleteAccountModal
            user={user}
            onClose={() => setIsDeleteOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
