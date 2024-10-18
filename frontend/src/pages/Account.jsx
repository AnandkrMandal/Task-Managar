import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Account = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching the user data", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const token = sessionStorage.getItem("accessToken");

    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Error updating the password", error);
      toast.error("Failed to update password.");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-sm flex justify-center font-serif items-start my-20 bg-slate-50 rounded overflow-hidden shadow-lg mx-auto p-4">
        <div className="space-y-4">
          <div className="mb-4">
            <span className="text-gray-700 text-base">UserName: </span>
            <span className="font-thin text-xl">{user?.username}</span>
          </div>
          <p className="text-gray-700 text-base">Email: {user?.email}</p>

          {isUpdating ? (
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button
                onClick={handleUpdate}
                className="bg-slate-950 mt-4 hover:bg-gray-700 text-white py-2 px-6 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setIsUpdating(false)}
                className="bg-gray-400 mt-2 ml-2 hover:bg-gray-500 text-white py-2 px-6 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsUpdating(true)}
              className="bg-slate-950 mt-4 hover:bg-gray-700 text-white py-2 px-6 rounded"
            >
              Update Password
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
