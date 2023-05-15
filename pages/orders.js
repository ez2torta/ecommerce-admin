import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Pagado?</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total Orden</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map(order => {
            console.log(order)
            const total_order = order.line_items.reduce((accumulator, value) => accumulator + (value.price_data?.unit_amount / 100), 0)
            return (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'Pagado :)' : 'No Pagado :('}
                </td>
                <td>
                  {order.name} {order.email}<br />
                  {order.city} {order.postalCode} {order.country}<br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map(l => (
                    <>
                      {l.price_data?.product_data.name} x
                      {l.quantity} =
                      {l.price_data?.unit_amount / 100}
                      <br />
                    </>
                  ))}
                </td>
                <td>
                  $ {total_order}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Layout>
  );
}
