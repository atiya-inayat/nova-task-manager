// "use client";

// import { signOut } from "next-auth/react";
// import AccountItem from "./AccountItem";

// const AccountSettings = ({
//   user,
//   onEditProfile,
//   onChangePassword,
// }: {
//   user: any;
//   onEditProfile: () => void;
//   onChangePassword: () => void;
// }) => {
//   return (
//     <div className="bg-slate-300  rounded-xl shadow-sm divide-y">
//       <AccountItem  title="Edit Profile" onClick={onEditProfile} />

//       {user.provider === "credentials" && (
//         <AccountItem title="Change Password" onClick={onChangePassword} />
//       )}

//       <AccountItem
//         title="Sign out"
//         danger
//         onClick={() => signOut({ callbackUrl: "/auth/signin" })}
//       />
//     </div>
//   );
// };

// export default AccountSettings;

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
          title="Edit Profile"
          subtitle="Update your name and personal info"
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
