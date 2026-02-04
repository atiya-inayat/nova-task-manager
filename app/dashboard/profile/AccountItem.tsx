// "use client";

// interface Props {
//   title: string;
//   danger?: boolean;
//   onClick?: () => void;
// }

// const AccountItem = ({ title, danger, onClick }: Props) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`w-full bg-slate-900 flex justify-between border border-slate-700 rounded-lg items-center p-4 text-left transition hover:bg-slate-700
//         ${danger ? "text-red-600" : "text-gray-800"}
//       `}
//     >
//       <span>{title}</span>
//       <span className="text-xl">›</span>
//     </button>
//   );
// };

// export default AccountItem;

"use client";

interface Props {
  title: string;
  subtitle?: string; // Added for better UX
  danger?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode; // Optional: add icons for "purpose"
}

const AccountItem = ({ title, subtitle, danger, onClick, icon }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200
        ${
          danger
            ? "bg-slate-800 border-slate-700 hover:border-blue-400 hover:bg-slate-700 text-slate-200"
            : "bg-slate-800  text-slate-200 border-slate-700 hover:border-blue-400  hover:shadow-md"
        }
      `}
    >
      <div className="flex flex-col text-left">
        <span className="font-semibold">{title}</span>
        {subtitle && <span className="text-xs opacity-70">{subtitle}</span>}
      </div>

      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xl">›</span>
      </div>
    </button>
  );
};

export default AccountItem;
