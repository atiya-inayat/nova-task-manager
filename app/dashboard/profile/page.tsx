"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ProfileHeader from "./ProfileHeader";
import AccountSettings from "./AccountSettings";
import DeleteAccount from "./DeleteAccount";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";

export default function ProfilePage() {
  const { data: user, error, isLoading } = useSWR("/api/profile", fetcher);
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load profile</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <ProfileHeader user={user} />

      <AccountSettings onEditProfile={() => setIsEditOpen(true)} />

      <DeleteAccount />

      {isEditOpen && (
        <EditProfileModal user={user} onClose={() => setIsEditOpen(false)} />
      )}
    </div>
  );
}
