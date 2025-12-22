import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Outlet } from "react-router-dom";

const ProtectedRouteLayout = () => {
  return (
    <section className="flex flex-col">
      <Header />
      <div className=" flex flex-1">
        <SideBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default ProtectedRouteLayout;
