import { deleteProductAction, fetchAdminProducts } from "@/utils/action";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/SubmitButton";
import Link from "next/link";

const AdminProductsPage = async () => {
  const items = await fetchAdminProducts();

  return (
    <Table>
      <TableCaption>Products total: {items.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-semibold capitalize tracking-wide text-muted-foreground ">
            Products name
          </TableHead>
          <TableHead className=" font-semibold capitalize tracking-wide text-muted-foreground ">
            Price
          </TableHead>
          <TableHead className=" font-semibold capitalize tracking-wide text-muted-foreground ">
            Company
          </TableHead>
          <TableHead className=" font-semibold capitalize tracking-wide text-muted-foreground ">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const ProductId = item.id;
          return (
            <TableRow key={item.id}>
              <TableCell className=" text-muted-foreground tracking-wide capitalize">
                {item.name}
              </TableCell>
              <TableCell>{formatCurrency(item.price)}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>
                <div className="flex gap-4 justify-center">
                  <DeleteProduction productId={ProductId} />
                  <Link href={`/admin/products/${ProductId}/edit`}>
                    <IconButton iconType="edit" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const DeleteProduction = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, productId);
  return (
    <FormContainer action={deleteProduct}>
      <IconButton iconType="delete" />
    </FormContainer>
  );
};
export default AdminProductsPage;
