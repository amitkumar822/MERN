import axios from "axios";
import { toast } from "react-toastify";

const AddToCart = async (event, id) => {
  event?.stopPropagation();
  event?.preventDefault();

  try {
    const { data } = await axios.post(
      `/api/user/addtocart`,
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
    console.error("Add To Card Error:\n ",error);
    toast.error(error?.response?.data?.message || "Failed to add to cart");
  }
};

export default AddToCart;
