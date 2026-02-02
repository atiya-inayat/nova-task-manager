"use client";

interface Props {
  title: string;
  danger?: boolean;
  onClick?: () => void;
}

const AccountItem = ({ title, danger, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex justify-between items-center p-4 text-left transition hover:bg-gray-50
        ${danger ? "text-red-600" : "text-gray-800"}
      `}
    >
      <span>{title}</span>
      <span className="text-xl">›</span>
    </button>
  );
};

export default AccountItem;
