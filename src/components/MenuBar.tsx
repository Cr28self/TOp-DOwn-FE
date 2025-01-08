import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const [expanded] = useState(true);

  useEffect(() => {
    // Add your effect logic here
    console.log("Expanded state changed:", expanded);
  }, [expanded]);

  return (
    // <aside className="h-screen">
    //   <nav className="h-full flex flex-col bg-white border-r shadow-sm">
    //     <div className="p-4 pb-2 flex justify-between items-center">
    //       <img
    //         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //         alt=""
    //         className="w-32"
    //       />
    //       <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
    //         <ChevronFirst />
    //       </button>
    //     </div>
    //     <ul className="flex-1 p-3">{children}</ul>
    //     <div className="border-t flex p-3">
    //       <img
    //         src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
    //         alt=""
    //         className="w-10 h-10 rounded-md"
    //       />
    //       <div
    //         className={`flex justify-between items-center overflow-hidden transition-all ${
    //           expanded ? "w-52 ml-3" : "w-0"
    //         }`}
    //       >
    //         {/* <div className="leading-4">
    //           <h4 className="font-semibold">John Doe</h4>
    //           <span className="text-xs text-gray-600">tkhoon3@naver.com</span>
    //         </div>
    //         <MoreVertical size={20} /> */}
    //       </div>
    //     </div>
    //   </nav>
    // </aside>

    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm justify-center p-4">
        <ul className="flex flex-col gap-4">
          <li>
            <MenuBarItem
              icon={<Calendar />}
              text="Calendar"
              link="/app/calendar"
            />
          </li>
          <li>
            <Button>hiih</Button>
          </li>
          <li>
            <Button>hiih</Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export const MenuBarItem = ({
  icon,
  text,
  active,
  link,
}: {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  link: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Link
      to={link}
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Button
        className={`bg-slate-300 ${active ? "border border-blue-500" : ""}`}
      >
        <span>{icon}</span>
      </Button>
      {showTooltip && <div className="absolute">{text}</div>}
    </Link>
  );
};

export default MenuBar;
