import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import ClientSideRowModelModule directly
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Registering the module
import { ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Students = () => {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div>
      <div
        style={{ height: 500 }} // define a height because the Data Grid will fill the size of the parent container
      >
        <AgGridReact 
          rowData={rowData} 
          columnDefs={colDefs} 
          pagination={true} // Enable pagination (optional)
          enableFilter={true} // Enable filtering
        />
      </div>
    </div>
  );
};

export default Students;
