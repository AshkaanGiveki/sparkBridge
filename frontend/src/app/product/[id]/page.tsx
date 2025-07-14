// src/app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import OptionsSelector from "@/components/product/OptionsSelector";
import AddToCartButton from "@/components/product/AddToCartButton";
import ReviewsList from "@/components/product/ReviewsList";
import ReviewsForm from "@/components/product/ReviewsForm";
import ProductAIAssistantSection from "@/components/product/ProductAIAssistantSection";
import { Metadata, ResolvingMetadata } from "next"; // Import ResolvingMetadata

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand?: { name: string };
  category?: {
    name: string;
    options: {
      name: string;
      values: {
        value: string;
        colorId?: string | null;
        color?: {
          id: string;
          name: string;
          hexCode: string;
        } | null;
      }[];
    }[];
  };
  selectedOptions?: {
    value: {
      value: string;
      colorId?: string | null;
      color?: {
        id: string;
        name: string;
      };
      option: {
        name: string;
      };
    };
  }[];
  images?: {
    id: string;
    imageName: string;
    productId: string;
  }[];
  rating?: number;
  reviews?: {
    id: string;
    text: string;
    rating: number;
  }[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030";

// **UPDATED PageProps definition for Next.js 15+**
type PageProps = {
  params: Promise<{ id: string }>; // params is now a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams is also a Promise
};

export async function generateMetadata(
  { params }: PageProps, // Destructure params from the PageProps object
  parent: ResolvingMetadata // parent metadata for extending, often optional if not used
): Promise<Metadata> {
  // Await params to get the actual object
  const resolvedParams = await params;
  const productId = resolvedParams.id; // Access the id from the awaited params

  const res = await fetch(`${BASE_URL}/api/products/${productId}`);
  if (!res.ok) {
    return { title: "Sparkbridge" };
  }

  const product = await res.json();
  return {
    title: `${product.name} | Sparkbridge`,
    description: product.description?.slice(0, 160) || "Product details on Sparkbridge.",
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");

    const products: Product[] = await res.json();
    return products.map((p) => ({ id: p.id }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function ProductPage({ params }: PageProps) {
  // Await params here as well, if you need to use them directly
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const product: Product = await res.json();
  if (!product || !product.name) return notFound();

  const images = product.images?.length
    ? product.images
    : [
        {
          id: "placeholder",
          imageName: "placeholder.jpg",
          productId: product.id, // Use product.id directly here if it's already available
        },
      ];

  const options =
    product.category?.options.map((opt) => ({
      name: opt.name,
      values: opt.values.map((v) => ({
        value: v.value,
        hexCode: v.color?.hexCode ?? null,
      })),
    })) ?? [];

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-8 md:px-10">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[60%_40%] md:gap-x-10">
        {/* Left side */}
        <div className="space-y-6">
          <ProductGallery images={images} />
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="my-4 text-lg">Customer Reviews</h3>
            <ReviewsList productId={product.id} />
            <ReviewsForm productId={product.id} />
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          {product.brand?.name && (
            <p className="text-sm text-gray-500 uppercase tracking-wider font-esscLight">
              {product.brand.name}
            </p>
          )}

          {product.rating !== undefined && (
            <div className="flex items-center gap-2 text-lg">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">
                ({Math.floor(Math.random() * 500) + 50} reviews)
              </span>
            </div>
          )}

          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>

          <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

          <OptionsSelector options={options} />

          <div className="flex items-center gap-4 pt-4">
            <AddToCartButton productId={product.id} />
          </div>

          <ProductAIAssistantSection
            productId={product.id}
            name={product.name}
            description={product.description}
            reviews={product.reviews || []}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-6 pb-4">
        {product.category?.name && (
          <p className="text-sm text-gray-500 uppercase tracking-wide">{product.category.name}</p>
        )}

        <ProductGallery images={images} />

        <div className="px-1">
          {product.brand?.name && (
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand.name}</p>
          )}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{product.name}</h1>
          {product.rating !== undefined && (
            <div className="flex items-center gap-2 text-base text-gray-700">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">
                ({Math.floor(Math.random() * 500) + 50} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="px-1">
          <OptionsSelector options={options} />
        </div>

        <ProductAIAssistantSection
          productId={product.id}
          name={product.name}
          description={product.description}
          reviews={product.reviews || []}
        />

        <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="my-4 text-lg">Customer Reviews</h3>
          <ReviewsList productId={product.id} />
          <ReviewsForm productId={product.id} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center shadow-lg z-20">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </main>
  );
}