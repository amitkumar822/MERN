import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import SearchVerticalCart from "../../components/Card/SearchVerticalCart/SearchVerticalCart";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/product/search" + query.search);
      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchSearchProduct();
  }, [query]);

  return (
    <div>
      <div className="container mx-auto p-4">
        {loading && <p className="text-lg text-center">Loading ...</p>}

        <p className="text-lg font-semibold my-3">
          Search Results : {data.length}
        </p>

        {data.length === 0 && !loading && (
          <p className="bg-white text-lg text-center p-4">No Data Found....</p>
        )}

        {data.length !== 0 && !loading && (
          <SearchVerticalCart loading={loading} data={data} />
        )}
      </div>
    </div>
  );
};

export default SearchProduct;