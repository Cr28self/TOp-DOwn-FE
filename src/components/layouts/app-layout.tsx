import { Outlet } from "react-router-dom";
import MenuBar from "@/components/MenuBar";

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <main className="flex">
        <MenuBar />

        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
