import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addMonths } from "date-fns";
import moment from "moment/moment";

const MonthSelect = () => {
  const today = new Date();

  const nextMonts = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonts)
  return (
    <div>
      <Popover>
        <PopoverTrigger>{moment(month).format("MMM YYYY")}</PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {console.log(value); setMonth(value)}}
            // onMonthChange={(value) => {selectedMonth(value); setMonth(value); console.log(value)}}
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelect;
