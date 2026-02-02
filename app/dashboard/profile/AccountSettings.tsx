import { signOut } from "next-auth/react";
import AccountItem from "./AccountItem";

const AccountSettings = ({ onEditProfile }: { onEditProfile: () => void }) => {
  return (
    <div>
      <AccountItem title="Edit Profile" onClick={onEditProfile} />
      <AccountItem title="Change Password" />
      <AccountItem
        title="Sign out"
        danger
        onClick={() => signOut({ callbackUrl: "/signin" })}
      />
    </div>
  );
};

export default AccountSettings;
