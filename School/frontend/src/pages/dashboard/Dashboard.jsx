import Barcharts from "@/components/BarCharts";
import ComposedCharts from "@/components/ComposedCharts";
import MonthSelect from "@/components/MonthSelect";
import PieCharts from "@/components/PieCharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  CalendarDays,
  LucideGraduationCap,
  IndianRupee,
} from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-screen overflow-auto pb-28">
      {/* Header */}
      <div className="w-full flex justify-between p-3 border-b-2 border-gray-200 ">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button className="flex items-center justify-center gap-1">
            <CalendarDays />
            <MonthSelect />
          </Button>
          <Button className="flex items-center justify-center gap-1">
            <LucideGraduationCap /> 10th
          </Button>
        </div>
      </div>

      {/* Student details */}
      <div className="p-3">
        <h1 className="font-semibold text-lg mb-1">Student details</h1>
        <div className="flex items-center gap-4 border-gray-200">
          {studentDetails.map((details) => (
            <div
              className="w-96 flex items-center gap-3 bg-[#8de8ff] p-4 rounded-lg"
              key={details.id}
            >
              <div className="bg-white p-2 rounded-full">
                <details.icons />
              </div>
              <div>
                <span>{details.lable}</span>
                <div className="text-2xl">{details.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment details */}
      <div className=" px-3">
        <h1 className="font-semibold text-lg mb-1">Fees details</h1>
        <div className="flex items-center gap-4 border-gray-200">
          {studentFees.map((details) => (
            <div
              className="w-96 flex items-center gap-3 bg-[#e0adec] p-4 rounded-lg"
              key={details.id}
            >
              <div className="bg-white p-2 rounded-full">
                <details.icons />
              </div>
              <div>
                <span>{details.lable}</span>
                <div className="text-2xl">{details.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="mt-4 mr-4 gap-3 p-3 grid grid-cols-[70%_auto]">
        <Card className="p-2">
          <Barcharts />
        </Card>
        <Card>
          <PieCharts />
        </Card>
      </Card>

      {/* Fise Collaction */}
      <Card className="mt-4">
        <ComposedCharts />
      </Card>
    </div>
  );
};

export default Dashboard;

const studentDetails = [
  {
    id: 1,
    lable: "Total Student",
    value: 100,
    icons: GraduationCap,
  },
  {
    id: 2,
    lable: "Total Present Student",
    value: "70%",
    icons: TrendingUp,
  },
  {
    id: 3,
    lable: "Total Absent Student",
    value: "30%",
    icons: TrendingDown,
  },
];

const studentFees = [
  {
    id: 1,
    lable: "Total Fees",
    value: "$1500",
    icons: IndianRupee,
  },
  {
    id: 2,
    lable: "Clear Fees",
    value: "$500",
    icons: CheckCircle,
  },
  {
    id: 3,
    lable: "Pending Fees",
    value: "$1000",
    icons: Clock,
  },
];

const BarChartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];
