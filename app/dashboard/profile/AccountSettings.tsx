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
    <div className="max-w-md mx-auto space-y-6">
      {/* Section 1: Profile Management */}
      <section>
        <h3 className="text-sm font-medium text-slate-500 mb-3 px-1 uppercase tracking-wider">
          Profile Settings
        </h3>
        <AccountItem
          title="Edit Profile image"
          subtitle="Update your profile image "
          onClick={onEditProfile}
        />

        {user.provider === "credentials" && (
          <AccountItem
            title="Change Password"
            subtitle="Secure your account with a new password"
            onClick={onChangePassword}
          />
        )}
      </section>

      {/* Section 2: Session Management */}
      <section>
        <h3 className="text-sm font-medium text-slate-500 mb-3 px-1 uppercase tracking-wider">
          Account Actions
        </h3>
        <AccountItem
          title="Sign out"
          subtitle="End your current session"
          danger
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        />
      </section>
    </div>
  );
};

export default AccountSettings;
