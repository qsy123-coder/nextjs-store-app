import CheckBoxInput from "@/components/form/CheckBoxInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import InputImageContainer from "@/components/form/InputImageContainer";
import PriceInput from "@/components/form/PriceInput";
import { SubmitButton } from "@/components/form/SubmitButton";
import TextAreaInput from "@/components/form/TextAreaInput";
import { fetchAdminProduct, updateProductAction, updateProductImage } from "@/utils/action";
import { redirect } from "next/dist/server/api-utils";

import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await fetchAdminProduct(id);

  const { name, price, description, company, featured, image } = product;
  return (
    <div>
      <InputImageContainer
        action={updateProductImage}
        image={image}
        productId={id}
      >
        <input
          type="hidden"
          name="url"
          value={image}
        />
        <input
          type="hidden"
          name="id"
          value={id}
        />
      </InputImageContainer>

      <FormContainer action={updateProductAction}>
        <div className="border border-gray-100 rounded-2xl p-10 mb-6 shadow">
          <h1 className="font-semibold text-2xl tracking-wide mb-8">Edit Products</h1>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <FormInput
              id="name"
              type="text"
              name="name"
              defaultValue={name}
              label="Product name:"
            />
            <FormInput
              id="company"
              type="text"
              name="company"
              defaultValue={company}
              label="Company Name:"
            />
            <PriceInput defaultValue={price} />
          </div>
          <input
            type="hidden"
            name="id"
            value={product.id}
          />
          <div className="mb-4">
            <TextAreaInput
              defaultValue={description}
              name="description"
              labelText="description"
            />
          </div>
          <CheckBoxInput
            name="featured"
            label="Featured"
          />
          <SubmitButton
            text="更新"
            btnSize="lg"
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default page;
