interface Props {
  title: string;
  danger?: boolean;
  onClick?: () => void;
}

const AccountItem = ({ title, danger, onClick }: Props) => {
  return (
    <div>
      <button
        className={`w-full flex justify-between items-center p-4 text-left ${danger ? "text-red-600" : ""}`}
      >
        <span>{title}</span>
        <span>›</span>
      </button>
    </div>
  );
};

export default AccountItem;
