import { useRef, useState } from "react";

import { ChevronsLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendarSidebar = () => {
  const calendarSidebarRef = useRef<HTMLElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  let startX = 0;
  let startWidth = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (calendarSidebarRef.current) {
      // e.clientX -- viewport 기준으로 마우스의 현재 위치 ( x좌표 )
      const dx = e.clientX - startX;
      const newWidth = Math.max(200, startWidth + dx); // 최소 너비 200px로 제한
      calendarSidebarRef.current.style.width = `${newWidth}px`;
    }
  };
  const handleMouseUp = () => {
    console.log("MouseUp -- event end");
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // 사이드바 크기 조정 핸들러
  const handleResizeSidebar = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (calendarSidebarRef.current) {
      startX = e.clientX;
      startWidth = calendarSidebarRef.current.offsetWidth; // 드래그 시작 시 Sidebar 너비
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section
      className={`relative bg-gray-200 p-4 transition-transform duration-300 ${
        isCollapsed ? "translate-x-[-100%]" : "translate-x-0"
      }`}
      ref={calendarSidebarRef}
      style={{ width: `300px` }}
      onMouseEnter={() => {
        if (calendarSidebarRef.current && isCollapsed) {
          calendarSidebarRef.current.style.transform = "translateX(0)";
        }
      }}
      onMouseLeave={() => {
        if (calendarSidebarRef.current && isCollapsed) {
          calendarSidebarRef.current.style.transform = "translateX(-100%)";
        }
      }}
    >
      <div className="flex justify-end">
        <Button
          variant={"outline"}
          className="mb-4 p-1"
          onClick={toggleSidebar}
        >
          <ChevronsLeft className="w-full h-full" />
        </Button>
      </div>

      {/* Blocks */}

      <div className="flex flex-col gap-2">
        <div className="bg-white shadow p-2 rounded">
          <h3 className="font-medium">Study React</h3>
          <ul className="list-disc ml-4">
            <li>Document</li>
            <li>useState</li>
            <li>useEffect</li>
          </ul>
        </div>

        <div className="bg-white shadow p-2 rounded">
          <h3 className="font-medium">React Quiz</h3>
          <ul className="list-disc ml-4">
            <li>React Quiz</li>
          </ul>
        </div>
      </div>

      <span
        className="absolute top-0 right-0 w-[3px] h-full cursor-col-resize bg-transparent"
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) =>
          (e.currentTarget.style.backgroundColor = "black")
        }
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
        onMouseDown={handleResizeSidebar}
      ></span>
    </section>
  );
};

export default CalendarSidebar;
