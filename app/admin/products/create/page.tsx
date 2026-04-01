import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { log } from "console";
import { faker } from "@faker-js/faker";
import React from "react";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { createProductAction } from "@/utils/action";
import PriceInput from "@/components/form/PriceInput";
import ImageInput from "@/components/form/ImageInput";
import CheckBoxInput from "@/components/form/CheckBoxInput";
import TextAreaInput from "@/components/form/TextAreaInput";
// const createProductAction = async (formData: FormData) => {
//   "use server";
//   const name = formData.get("name") as string;
//   console.log(name);
// };
const CreatePage = () => {
  const name = faker.commerce.productName();
  const company = faker.company.name();
  const description = faker.lorem.paragraphs({ min: 10, max: 12 });
  return (
    <div>
      <h1 className="font-semibold text-2xl tracking-wide mb-8">Create Products</h1>
      <div className="p-10 border border-gray-300 rounded-md">
        <div>
          <FormContainer action={createProductAction}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <FormInput
                id="name"
                type="text"
                name="name"
                defaultValue={name}
                label="Product name:"
              />
              <FormInput
                defaultValue={company}
                id="company"
                name="company"
                label="Company name"
                type="text"
              />
              <PriceInput />
              <ImageInput />
            </div>
            <div className="mb-4">
              <TextAreaInput
                defaultValue={description}
                name="description"
                labelText="description"
              />
            </div>
            <CheckBoxInput
              name="featured"
              defaultValue={false}
              label="Featured"
            />
            <Button
              type="submit"
              variant={"outline"}
              size="lg"
            >
              提交
            </Button>
          </FormContainer>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
