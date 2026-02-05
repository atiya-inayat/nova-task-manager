import { useState } from "react";

const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/profile/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update password");
        return;
      }

      onClose();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center">
  //     <div className="bg-slate-300 border-slate-400 p-6 rounded-xl w-full max-w-md space-y-4">
  //       <h2>Change Password</h2>

  //       {error && <p className="text-red-500 text-sm">{error}</p>}

  //       <div>
  //         <label>Current Password</label>
  //         <input
  //           type="password"
  //           value={currentPassword}
  //           onChange={(e) => setCurrentPassword(e.target.value)}
  //           className="w-full border rounded-lg p-2 mt-1"
  //         />
  //       </div>

  //       <div>
  //         <label>New Password</label>
  //         <input
  //           type="password"
  //           value={newPassword}
  //           onChange={(e) => setNewPassword(e.target.value)}
  //           className="w-full border rounded-lg p-2 mt-1"
  //         />
  //       </div>

  //       <div className="flex gap-4 ">
  //         <button
  //           onClick={onClose}
  //           className="bg-slate-700 font-bold hover:bg-slate-950 text-white px-4 py-2 rounded-lg"
  //         >
  //           Cancel
  //         </button>
  //         <button
  //           onClick={handleChangePassword}
  //           disabled={loading}
  //           className="bg-slate-950 font-bold hover:bg-slate-700 cursor-pointer text-white px-4 py-2 rounded-lg"
  //         >
  //           {loading ? "Updating..." : "Update"}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-slate-200 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Change Password
        </h2>

        {error && (
          <p className="text-red-600 text-xs mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Current Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-slate-300 rounded-xl p-3 mt-1 focus:border-indigo-500 outline-none transition"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 ml-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-slate-300 rounded-xl p-3 mt-1 focus:border-indigo-500 outline-none transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={onClose}
            className="w-full py-3 font-bold text-slate-600 hover:bg-slate-300 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
