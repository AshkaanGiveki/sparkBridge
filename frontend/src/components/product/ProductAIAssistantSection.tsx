import React from 'react';
import AIAssistantClient from "@/components/product/AIAssistantClient";

interface ProductAIAssistantSectionProps {
  productId: string;
  name: string;
  description: string;
  reviews: {
    id: string;
    text: string;
    rating: number;
  }[];
}

const ProductAIAssistantSection: React.FC<ProductAIAssistantSectionProps> = ({
  productId,
  name,
  description,
  reviews,
}) => {
  return (
    <div className="rounded-xl ">
      <AIAssistantClient
        productId={productId}
        name={name}
        description={description}
        reviews={reviews || []}
      />
    </div>
  );
};

export default ProductAIAssistantSection;