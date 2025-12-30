import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-hook";
import { changeTab } from "./returnManagementSlice";
// import { useEffect } from "react";
import { RETURN_STATUS, type ReturnStatus } from "./types";
import { useEffect } from "react";

const tabs = Object.values(RETURN_STATUS);
const ReturnStatusTabs = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.return.activeStatus);

  useEffect(() => {
    const statusFromUrl = location.pathname.split("/").pop();

    if (statusFromUrl && tabs.includes(statusFromUrl as ReturnStatus)) {
      dispatch(changeTab(statusFromUrl as ReturnStatus));
    }
  }, [location.pathname, dispatch]);
  return (
    <>
      <div className="flex gap-6 mx-4 border-b-4 border-[#f2f2f2]">
        {tabs.map((tab) => (
          <NavLink
            key={tab}
            to={`/returns/${tab}`}
            onClick={() => dispatch(changeTab(tab))}
            className={`font-medium flex items-center gap-2 p-2 border-b-4 -mb-1 capitalize cursor-pointer ${
              active === tab ? "border-black" : "border-transparent"
            }`}
          >
            {tab.replaceAll("_", " ")}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default ReturnStatusTabs;
