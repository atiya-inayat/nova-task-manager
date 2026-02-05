// const DeleteAccount = ({ onDelete }: { onDelete: () => void }) => {
//   return (
//     <div className="border max-w-md mx-auto  border-slate-500 bg-slate-800 rounded-xl p-6">
//       <h3 className="text-slate-200 font-semibold mb-2">Danger Zone</h3>

//       <button
//         onClick={onDelete}
//         className="text-white font-bold bg-red-700 border border-red-400 hover:bg-red-800   py-2 text-sm cursor-pointer px-2 rounded-lg "
//       >
//         Delete Account
//       </button>

//       <p className="text-sm text-slate-500 mt-2">
//         This action is permanent and cannot be undone.
//       </p>
//     </div>
//   );
// };

// export default DeleteAccount;

const DeleteAccount = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <div className="border border-red-900/30 bg-red-950/10 rounded-2xl p-6 md:p-8">
      <h3 className="text-red-400 font-bold mb-1 uppercase text-xs tracking-widest">
        Danger Zone
      </h3>
      <p className="text-slate-500 text-sm mb-6">
        Permanently delete your account and all projects. This cannot be undone.
      </p>

      <button
        onClick={onDelete}
        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition cursor-pointer text-sm shadow-lg shadow-red-900/20"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
