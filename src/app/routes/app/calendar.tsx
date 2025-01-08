import CalendarArea from "@/components/Calendar-Area";
import CalendarSidebar from "@/components/Calendar-Sidebar";
import TestCalendarArea from "@/components/TestCalendarArea";
import { Button } from "@/components/ui/button";
import {
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  format,
  subDays,
} from "date-fns";

function getPreviousMonthDates(year, month) {
  const firstDayOfMonth = startOfMonth(new Date(year, month - 1));

  // 0 ~ 6 ( 0:Sun ~ 6:Sat )
  // ! 첫번째 날짜의 요일을 추출
  const dayOfWeek = firstDayOfMonth.getDay();

  const previousMonthDates = [];
  for (let i = 0; i < dayOfWeek; i++) {
    const date = subDays(firstDayOfMonth, dayOfWeek - i);
    previousMonthDates.push({
      date,
      formatted: format(date, "yyyy-MM-dd"), // 포맷된 날짜 (예: 2024-12-29)
    });
  }

  return previousMonthDates;
}

function getDatesForMonth(year: number, month: number) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));
  return eachDayOfInterval({ start, end }).map((date: Date) => ({
    date,
    formatted: format(date, "yyyy-MM-dd"),
  }));
}

function getCalendarDates(year, month) {
  const previousMonthDates = getPreviousMonthDates(year, month);
  const currentMonthDates = getDatesForMonth(year, month);

  const totalDays = previousMonthDates.length + currentMonthDates.length;
  // 블록 최대 35
  const remainingDays = 35 - totalDays;

  const nextMonthDates = [];
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month, i); // 다음 달 날짜 계산
    nextMonthDates.push({
      date,
      formatted: format(date, "yyyy-MM-dd"),
    });
  }

  return [...previousMonthDates, ...currentMonthDates, ...nextMonthDates];
}

const CalendarRoute = () => {
  console.log(getCalendarDates(2025, 2));
  return (
    <div className="flex flex-1">
      {/* Input Area */}

      <CalendarSidebar />

      {/* Calendar */}
      <section className="flex-1 bg-gray-100 p-4">
        <div className="bg-white shadow rounded h-full">
          {/* <CalendarArea /> */}
          <TestCalendarArea />
        </div>
      </section>
    </div>
  );
};

export default CalendarRoute;
