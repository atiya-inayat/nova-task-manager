const DeleteAccount = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <div className="border border-red-200 bg-red-50 rounded-xl p-6">
      <h3 className="text-red-700 font-semibold mb-2">Danger Zone</h3>

      <button onClick={onDelete} className="text-red-600 font-medium">
        Delete Account
      </button>

      <p className="text-sm text-red-500 mt-2">
        This action is permanent and cannot be undone.
      </p>
    </div>
  );
};

export default DeleteAccount;
