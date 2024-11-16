import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

const SearchProduct = () => {
  const query = useLocation();
  console.log(query.search); // Output:?q=iphone12

  const fetchSearchProduct = async () => {
    try {
      const response = await axios.get("/api/product/search" + query.search);
      console.log(response.data);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  useEffect(() => {
    fetchSearchProduct();
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      {/* Display the search query */}
      <p>Search query: {new URLSearchParams(query.search).get("q")}</p>
    </div>
  );
};

export default SearchProduct;
