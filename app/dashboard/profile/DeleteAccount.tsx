const DeleteAccount = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <div className="border max-w-md mx-auto  border-slate-500 bg-slate-800 rounded-xl p-6">
      <h3 className="text-slate-200 font-semibold mb-2">Danger Zone</h3>

      <button
        onClick={onDelete}
        className="text-white font-bold bg-red-700 border border-red-400 hover:bg-red-800   py-2 text-sm cursor-pointer px-2 rounded-lg "
      >
        Delete Account
      </button>

      <p className="text-sm text-slate-500 mt-2">
        This action is permanent and cannot be undone.
      </p>
    </div>
  );
};

export default DeleteAccount;
