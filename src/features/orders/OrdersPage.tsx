import OrderStatusTabs from "./OrderStatusTabs";

const OrdersPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mx-4 mt-6 mb-3">Manage Orders</h1>
      <OrderStatusTabs />
    </div>
  );
};

export default OrdersPage;
