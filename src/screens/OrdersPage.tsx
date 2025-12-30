import OrdersTable from "@/features/orders/OrdersTable";
import OrderStatusTabs from "@/features/orders/OrderStatusTabs";

const OrdersPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mx-4 mt-6 mb-3">Manage Orders</h1>
      <div className="">
        <OrderStatusTabs />
        {/* Order Status Content */}
        <div className="flex items-center justify-center m-6">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
