import { CalendarCheck } from "lucide-react";
import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const PieCharts = () => {
  const data01 = [
    {
      name: "Group A",
      value: 900,
      fill: "#21DB21",
    },
    {
      name: "Group B",
      value: 300,
      fill: "red",
    },
  ];
  const data02 = [
    {
      name: "Present",
      value: 2400,
      fill: "#21DB21",
    },
    {
      name: "Absent",
      value: 767,
      fill: "red",
    },
  ];

  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <h1 className="text-md font-semibold underline px-4 pt-3 flex gap-2"><CalendarCheck/> Monthly Attendance</h1>
      <PieChart>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8de8ff"
        />
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#e0adec"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieCharts;
