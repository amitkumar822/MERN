import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCreators } from "../contexts/CreatorsProvider";

const Creator = () => {
  const { creators: admin } = useCreators();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 6).map((element, index) => {
            return (
              <div key={index}>
                <Link to={`/`}>
                  <div className="flex flex-col items-center -ml-14">
                    <img
                      src={element?.photo?.url}
                      className="w-52 h-52 object-cover border border-black rounded-full items-center"
                      alt="creater"
                    />
                    <div className="text-center">
                      <p>{element?.name}</p>
                      <p className="text-gray-600 text-xs">{element?.role}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Creator;
