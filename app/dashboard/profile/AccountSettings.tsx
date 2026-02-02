"use client";

import { signOut } from "next-auth/react";
import AccountItem from "./AccountItem";

const AccountSettings = ({
  user,
  onEditProfile,
  onChangePassword,
}: {
  user: any;
  onEditProfile: () => void;
  onChangePassword: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm divide-y">
      <AccountItem title="Edit Profile" onClick={onEditProfile} />

      {user.provider === "credentials" && (
        <AccountItem title="Change Password" onClick={onChangePassword} />
      )}

      <AccountItem
        title="Sign out"
        danger
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      />
    </div>
  );
};

export default AccountSettings;
