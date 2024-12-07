import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DeleteUser = ({ userId, setUserId, fetchAllUsers }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/user/delete-user/${userId}`);
      toast.success("User deleted successfully");
      setLoading(false);
      setUserId("");
      fetchAllUsers(); // Fetch updated user list after deletion
      // Close the modal after success
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box flex flex-col items-center text-center p-6">
          {/* Confirmation Message */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Are you sure?
          </h3>
          <p className="text-gray-600 mb-6">
            Do you really want to delete this user? This action cannot be
            undone.
          </p>

          <div className="flex justify-center gap-4 mt-4">
            {/* Confirm Delete Button */}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleDeleteUser}
              disabled={loading}
              sx={{ paddingY: 1.5, borderRadius: 50, width: 90 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Delete"
              )}
            </Button>

            {/* Cancel Button */}
            <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{paddingY: 1.5, borderRadius: 50, width: 90}}
              onClick={() => {
                setUserId(""); // Reset selected user ID
                document.getElementById("my_modal_1").close(); // Close modal
              }}
              
            >
              Cancel
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteUser;
