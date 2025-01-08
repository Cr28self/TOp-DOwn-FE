// Import necessary libraries
import React, { useState } from "react";

const CalendarArea = () => {
  // Create a state to track the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  // Generate days of the week
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // Generate a 5x7 grid for the calendar with dates for demonstration purposes
  const generateDates = () => {
    let currentDate = 1;
    return Array.from({ length: 5 }, (_, rowIndex) => {
      return Array.from({ length: 7 }, (_, colIndex) => {
        return { row: rowIndex, col: colIndex, date: currentDate++ };
      });
    });
  };

  const weeks = generateDates();

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    setSelectedDate(`${row + 1}주차 ${daysOfWeek[col]}`);
  };

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-bold text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-5 grid-cols-7 flex-1">
        {weeks.flat().map(({ row, col, date }) => (
          <div
            key={`${row}-${col}`}
            onClick={() => console.log(row, col)}
            className="relative border  text-center"
          >
            {/* px-10 py-16 */}
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm">
              {date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarArea;
