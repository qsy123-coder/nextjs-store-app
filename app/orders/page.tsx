import React from "react";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserOrders } from "@/utils/action";
import SectionTitle from "@/components/global/SectionTitle";
import { formatDate } from "@/utils/format";
const OrdersPage = async () => {
  const orders = await fetchUserOrders();
  if (orders.length === 0) {
    return <SectionTitle text="Your orders is empty" />;
  }
  return (
    <div>
      <SectionTitle text="Your orders" />
      <Table>
        <TableCaption>{`${orders.length} order${orders.length > 1 ? "s" : ""} has found`}</TableCaption>
        <TableHeader>
          <TableRow className="capitalize">
            <TableHead>order total</TableHead>
            <TableHead>products</TableHead>
            <TableHead>tax</TableHead>
            <TableHead>shipping fee</TableHead>
            <TableHead>email</TableHead>
            <TableHead>date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            const { id, products, orderTotal, tax, shipping, email, createdAt } = order;
            return (
              <TableRow key={id}>
                <TableHead>{formatCurrency(orderTotal)}</TableHead>
                <TableHead>{products} 个</TableHead>
                <TableHead>{formatCurrency(tax)}</TableHead>
                <TableHead>{formatCurrency(shipping)}</TableHead>
                <TableHead>{email}</TableHead>
                <TableHead>{formatDate(createdAt)}</TableHead>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
