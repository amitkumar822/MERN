import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarCharts = () => {
  const data = [
    {
      name: "January",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "February",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "March",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "April",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "June",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "July",
      uv: 3490,
      pv: 4300,
    },
  ];

  return (
    <div>
      <div>
        <ResponsiveContainer width={"100%"} height={310}>
          <h1 className="text-md font-semibold underline mb-1">Attendance</h1>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8de8ff" />
        <Bar dataKey="uv" fill="#e0adec" /> */}
            <Bar dataKey="pv" name={"Total Present"} fill="#8884d8" />
            <Bar dataKey="uv" name={"Total Absent"} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarCharts;
