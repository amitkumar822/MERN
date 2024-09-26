import React from "react";
import './ProductCard.css'

const ProductCard = () => {
  return (
    <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src="https://www.bing.com/th?id=OPAC.nJIDf6Slu8ynow474C474&o=5&pid=21.1&w=160&h=235&rs=1&qlt=100&dpr=1.1&c=8&pcl=f5f5f5"
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">Universaloutfit</p>
          <p>Casual Puff Sleeves Solid Women White Top</p>
        </div>

        <div className="flex items-center space-x-2">
            <p className="font-semibold">₹199</p>
            <p className="line-through opacity-50">₹1999</p>
            <p className="text-green-600 font-semibold">70% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
