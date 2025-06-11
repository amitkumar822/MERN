import { toast } from "react-toastify";
import API from "../api/axiosInstance";

const AddToCart = async (event, id) => {
  event?.stopPropagation();
  event?.preventDefault();

  try {
    const { data } = await API.post(
      `/user/addtocart`,
      {
        productId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    toast.success("Product added to cart successfully!");
    return data?.data;
  } catch (error) {
    console.error("Add To Card Error:\n ", error?.response);
    toast.warning(error?.response?.data?.message || "Failed to add to cart");
  }
};

export default AddToCart;
