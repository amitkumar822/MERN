import axios from "axios";
import React, { useEffect, useState } from "react";
import scrollTop from "../helpers/scrollTop";
import { Link } from "react-router-dom";

const ProductShowcase = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/api/life-style/get-life-style", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setProduct(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(product);

  return (
    <div className="bg-gray-100 p-4">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Column 1: Most-Loved Products */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">
            Customers' Most-Loved Products for you
          </h2>
          <div className="flex flex-wrap gap-2">
            <img
              src="https://res.cloudinary.com/dud6rs8er/image/upload/v1733734578/uto7bpcqimzeigvk80z7.webp"
              alt="Product 1"
              className="rounded-lg h-32"
            />
            <img
              src="https://res.cloudinary.com/dud6rs8er/image/upload/v1733552279/jppxhwm3n43efwaigi10.webp"
              alt="Product 2"
              className="rounded-lg h-32"
            />
            <img
              src="https://res.cloudinary.com/dud6rs8er/image/upload/v1733734578/uto7bpcqimzeigvk80z7.webp"
              alt="Product 1"
              className="rounded-lg h-32"
            />
            <img
              src="https://res.cloudinary.com/dud6rs8er/image/upload/v1733552279/jppxhwm3n43efwaigi10.webp"
              alt="Product 2"
              className="rounded-lg h-32"
            />
          </div>
        </div>

        {/* Column 2: Revamp Your Home */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Revamp your home in style</h2>
          <div className="grid grid-cols-2 gap-2">
            {product &&
              product?.map((items, index) => (
                <Link
                  to={"/product/" + items?._id}
                  onClick={scrollTop}
                  className="text-center cursor-pointer"
                  key={index}
                >
                  <img
                    src={items?.productImage[0].url}
                    alt="Home Decor"
                    className="rounded-lg"
                  />
                  <p className="mt-1 text-sm">{items?.category}</p>
                </Link>
              ))}
          </div>
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            Explore all
          </a>
        </div>

        {/* Column 3: Small Businesses */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">
            Explore more from Small Businesses
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dud6rs8er/image/upload/v1734627286/iin1hyy56whmgtttr81u.webp"
                alt="Ethnic Wear"
                className="rounded-lg h-36"
              />
              <p className="mt-1 text-sm">Ethnic Wear</p>
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dud6rs8er/image/upload/v1734627286/iin1hyy56whmgtttr81u.webp"
                alt="Ethnic Wear"
                className="rounded-lg h-36"
              />
              <p className="mt-1 text-sm">Ethnic Wear</p>
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dud6rs8er/image/upload/v1734627286/iin1hyy56whmgtttr81u.webp"
                alt="Ethnic Wear"
                className="rounded-lg h-36"
              />
              <p className="mt-1 text-sm">Ethnic Wear</p>
            </div>
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dud6rs8er/image/upload/v1734627286/iin1hyy56whmgtttr81u.webp"
                alt="Ethnic Wear"
                className="rounded-lg h-36"
              />
              <p className="mt-1 text-sm">Ethnic Wear</p>
            </div>
          </div>
          <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
            Explore all
          </a>
        </div>

        {/* Column 4: Sign In */}
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">
            Sign in for your best experience
          </h2>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg mt-4">
            Sign in securely
          </button>
          <img
            src="https://res.cloudinary.com/dud6rs8er/image/upload/v1734151762/e6xleq1fv2max8qp7ise.webp"
            alt="Product"
            className="mt-4 rounded-lg h-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
