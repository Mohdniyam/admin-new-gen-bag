import { selectFilteredOrders } from "./OrdersSelectors";
import { useAppSelector } from "@/hooks/redux-hook";

export default function OrdersTable() {
  const orders = useAppSelector(selectFilteredOrders);

  return (
    <table className="w-2/3 border">
      <thead>
        <tr className="h-10 bg-[#f2f2f3]">
          <th>ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="text-center border-t">
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.amount}</td>
            <td className="capitalize">{order.status.replaceAll("_", " ")}</td>
            <td>{order.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
