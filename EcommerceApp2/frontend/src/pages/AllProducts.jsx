import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { toast } from "react-toastify";
import axios from "axios";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const fetchAllProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/get-products");
      setProductList(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="w-full max-h-[calc(100vh-120px)] overflow-y-auto md:flex flex-col hidden">
      <div className="w-full py-2 px-4 flex justify-between items-center sticky top-0 left-0 bg-white z-10">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="btn border-2 bg-green-600 hover:bg-green-700 duration-200 text-white transition-all py-1 px-3 rounded-full"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Upload Product
        </button>
      </div>

      {/* Upload All Product Components */}
      <UploadProduct />

      {/* Admin Product Cart */}
      <div className="flex flex-wrap">
        {productList &&
          productList.map((product, index) => (
            <AdminProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;

const productList2 = [
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
  { 
    productName: "Samasang",
    price: 1000,
    sellingPrice: 900,
    description: "A soothing and comfortable massage oil",
    brand: "Johnson & Johnson",
    category: "Beauty", 
    quantity: 5,
    img: "https://res.cloudinary.com/dgsey2kim/image/upload/v1731330452/ledagfxsfx8uobpnfwwp.png",
  },
];