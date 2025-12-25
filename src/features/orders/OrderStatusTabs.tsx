import { NavLink } from "react-router-dom";

const tabs = [
  { label: "On Hold", path: "orders/onhold", count: 11 },
  { label: "Pending", path: "orders/pending", count: 29 },
  { label: "To Be Dispatched", path: "orders/dispatched", count: 13 },
  { label: "Ready To Ship", path: "orders/ready", count: 9 },
  { label: "Shipped", path: "orders/shipped" },
  { label: "Cancelled", path: "orders/cancelled" },
  { label: "All", path: "orders/all" },
];

const OrderStatusTabs = () => {
  return (
    <div className="">
      <div className="flex gap-6 mx-4 border-b-4 border-[#f2f2f2]">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={`/${tab.path}`}
            className={({ isActive }) =>
              `font-medium flex items-center gap-2 p-2 border-b-4 -mb-1
               ${isActive ? " border-black" : "border-transparent"}`
            }
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="border border-black text-xs font-bold px-1 rounded-xs">
                {tab.count}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusTabs;
