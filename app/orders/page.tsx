import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUsersOrder } from "@/utils/action";
import SectionTitle from "@/components/global/SectionTitle";
const OrdersPage = async () => {
  const orders = await fetchUsersOrder();

  return (
    <div>
      <SectionTitle text="Your orders" />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {orders.map((order, index) => {
              return <TableHead></TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
