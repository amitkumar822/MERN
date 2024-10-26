import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const CreatorsContext = createContext();

export const CreatorsProvider = ({ children }) => {
  const [creators, setCreators] = useState();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get("/api/users/get-admin");
        // console.log(data);
        setCreators(data.admin);
      } catch (error) {
        console.log("Error CreatorsProvider", error.message);
      }
    };
    fetchCreators();
  }, [setCreators]);
  return (
    <CreatorsContext.Provider value={{ creators }}>
      {children}
    </CreatorsContext.Provider>
  );
};

export const useCreators = () =>  useContext(CreatorsContext);
