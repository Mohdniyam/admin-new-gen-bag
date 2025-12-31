import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedRouteLayout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="shadow-xl z-10">
          <Header />
        </header>
        <div className="flex flex-1 overflow-hidden">
          <aside className="h-full">
            <SideBar />
          </aside>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default ProtectedRouteLayout;
