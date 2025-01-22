import React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const ComposedCharts = () => {
  const data = [
    {
      month: "January",
      collectedFees: 4000,
      uncollectedFees: 1000,
      totalFees: 5000,
    },
    {
      month: "February",
      collectedFees: 3000,
      uncollectedFees: 1500,
      totalFees: 4500,
    },
    {
      month: "March",
      collectedFees: 5000,
      uncollectedFees: 2000,
      totalFees: 7000,
    },
    {
      month: "April",
      collectedFees: 4500,
      uncollectedFees: 1000,
      totalFees: 5500,
    },
    {
      month: "May",
      collectedFees: 6000,
      uncollectedFees: 2000,
      totalFees: 8000,
    },
    {
      month: "June",
      collectedFees: 7000,
      uncollectedFees: 1500,
      totalFees: 8500,
    },
    {
      month: "July",
      collectedFees: 6500,
      uncollectedFees: 2500,
      totalFees: 9000,
    },
    {
      month: "August",
      collectedFees: 7000,
      uncollectedFees: 3000,
      totalFees: 10000,
    },
    {
      month: "September",
      collectedFees: 7500,
      uncollectedFees: 2500,
      totalFees: 10000,
    },
    {
      month: "October",
      collectedFees: 8000,
      uncollectedFees: 2000,
      totalFees: 10000,
    },
    {
      month: "November",
      collectedFees: 8500,
      uncollectedFees: 1500,
      totalFees: 10000,
    },
    {
      month: "December",
      collectedFees: 9000,
      uncollectedFees: 1000,
      totalFees: 10000,
    },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="totalFees" fill="#82ca9d" stroke="#82ca9d" name="Total Fees" />
          <Bar dataKey="collectedFees" barSize={20} fill="#413ea0" name="Collected Fees" />
          <Line type="monotone" dataKey="uncollectedFees" stroke="#ff7300" name="Uncollected Fees" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComposedCharts;
