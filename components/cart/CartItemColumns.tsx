import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Link from "next/link";

export const FirstColumn = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="relative h-30 w-30 md:h-40 md:w-40">
      <Image
        src={image}
        alt={name}
        priority
        fill
        className="object-cover rounded-xl"
      />
    </div>
  );
};

export const SecondColumn = ({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) => {
  return (
    <div>
      <h3 className="font-medium text-lg capitalize tracking-wide ">
        <Link href={`/products/${productId}`}>{name}</Link>
      </h3>
      <h4 className="font-medium text-sm capitalize tracking-wide ">{company}</h4>
    </div>
  );
};

export const ThirdColumn = () => {
  return <div>ThirdColumn</div>;
};

export const FourthColumn = ({ price }: { price: number }) => {
  return (
    <div>
      <h4 className="font-bold text-sm">{formatCurrency(price)}</h4>
    </div>
  );
};
