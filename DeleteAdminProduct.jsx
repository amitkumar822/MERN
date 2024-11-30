import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const DeleteAdminProduct = ({ productId, setProductId, fetchAllProduct }) => {
  useEffect(() => {
    document.getElementById("deleteAdminProduct_modal").showModal();
  }, [productId]);

  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/product/delete/${productId}`);
      setLoading(false);
      toast.success("User deleted successfully");
      console.log(data);
      setProductId("");
      fetchAllProduct(); // Fetch updated user list after deletion
      // Close the modal after success
      document.getElementById("deleteAdminProduct_modal").close();
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <div>
      <dialog id="deleteAdminProduct_modal" className="modal">
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
            <button
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full shadow-md transition duration-200 transform hover:scale-105"
            >
              {loading ? <ClipLoader loading={loading} /> : "Yes, Delete"}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => {
                setProductId("");
                document.getElementById("deleteAdminProduct_modal").close(); // Close modal
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteAdminProduct;
