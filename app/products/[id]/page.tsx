import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductReview from "@/components/review/ProductReview";
import SubmitReview from "@/components/review/SubmitReview";
import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { fetchSingleProduct } from "@/utils/action";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const SingleProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { name, image, company, price } = await fetchSingleProduct(id);
  //   const {name,image}=product
  return (
    <div>
      <BreadCrumbs text={name} />
      <section className="grid md:grid-cols-2 grid-cols-1 gap-15">
        <div className="relative md:h-full h-84 w-full">
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
            className="object-cover w-full rounded-xl"
          />
        </div>
        <div>
          <div className="flex items-center gap-4 ">
            <h1 className="capitalize text-4xl font-semibold tracking-tight mb-2 ">{name}</h1>
            <div className="flex items-center gap-2">
              <ShareButton
                productId={id}
                name={name}
              />
              <FavoriteToggleButton productId={id} />
            </div>
          </div>

          <ProductRating />
          <p className="text-xl font-mono py-4">{company}</p>
          <span className="bg-amber-100 p-3 text-sm rounded-sm">{formatCurrency(price)}</span>
          <p className="text-lg text-muted-foreground leading-8 tracking-wide mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde maxime nostrum et. Alias
            magni a voluptatum assumenda nemo saepe rerum, totam autem doloremque dicta sapiente
            consequuntur provident quaerat accusamus natus.
          </p>
          <div className="mt-4">
            <AddToCart />
          </div>
        </div>
      </section>
      <SubmitReview productId={id} />
      <ProductReview productId={id} />
    </div>
  );
};

export default SingleProductPage;
