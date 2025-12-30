import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedRouteLayout = () => {
  return (
    <>
      <div className="flex flex-col">
        <header className="shadow-xl z-10">
          <Header />
        </header>
        <div className="flex flex-1">
          <aside>
            <SideBar />
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default ProtectedRouteLayout;
