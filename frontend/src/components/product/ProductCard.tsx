import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "../ui/card";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const imageUrl = product.images?.[0]
    ? `${process.env.NEXT_PUBLIC_API_URL}/assets/images/${product.images[0].imageName}`
    : `${process.env.NEXT_PUBLIC_API_URL}/assets/images/placeholder.jpg`;

  return (
    <Link href={`/product/${product.id}`} passHref>
      <Card className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative flex justify-center p-4 align-center w-full h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            width={1000}
            height={1000}
            className="w-auto h-auto hmax-50 wmax-50 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4 flex-1 flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            {product.brand?.name && (
              <span className="inline-block mt-1 text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full font-medium">
                {product.brand.name}
              </span>
            )}
          </div>
        </CardContent>

        {/* Footer: Price and (optional) Rating */}
        <CardFooter className="p-4 pt-0 flex justify-between items-center text-gray-800">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-yellow-500">
            ⭐ {Math.floor(Math.random() * 1.99) + 3}.{Math.floor(Math.random() * 10)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
