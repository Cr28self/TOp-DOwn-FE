import CalendarArea from "@/features/calendar/components/Calendar-Area";
import CalendarSidebar from "@/features/calendar/components/Calendar-Sidebar";

const CalendarRoute = () => {
  return (
    <div className="flex flex-1">
      {/* Input Area */}

      <CalendarSidebar />

      {/* Calendar */}
      <section className="flex-1 bg-gray-100 p-4">
        <div className="bg-white shadow rounded h-full">
          <CalendarArea />
        </div>
      </section>
    </div>
  );
};

export default CalendarRoute;
