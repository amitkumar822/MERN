import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerRouters from "./Routers/CustomerRouters";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/*" element={<CustomerRouters />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
