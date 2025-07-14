#!/bin/bash

echo "🔧 Creating full project structure..."

mkdir -p src/{app/layout,app/product/[id],components/{layout,product,ui,shared},lib,store,types,styles,config}
mkdir -p public/assets/images

# layout.tsx
cat <<EOF > src/app/layout.tsx
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* You can include Navbar and Footer here later */}
        {children}
      </body>
    </html>
  );
}
EOF

# page.tsx placeholder
cat <<EOF > src/app/page.tsx
export default function HomePage() {
  return (
    <div className="text-center mt-20 text-2xl text-gray-600">
      Welcome to your e-commerce product page!
    </div>
  );
}
EOF

# product/[id]/page.tsx
cat <<EOF > src/app/product/[id]/page.tsx
import ProductDetail from "@/components/product/ProductDetail";

export default function ProductPage() {
  return (
    <main className="p-4">
      <ProductDetail />
    </main>
  );
}
EOF

# Navbar.tsx
cat <<EOF > src/components/layout/Navbar.tsx
export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto">My Shop</div>
    </nav>
  );
}
EOF

# Footer.tsx
cat <<EOF > src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full p-4 mt-10 bg-gray-100 text-center text-gray-500 text-sm">
      &copy; \$(new Date().getFullYear()) My Shop
    </footer>
  );
}
EOF

# ProductDetail.tsx
cat <<EOF > src/components/product/ProductDetail.tsx
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import OptionsSelector from "./OptionsSelector";
import AIAssistant from "./AIAssistant";
import Reviews from "./Reviews";

export default function ProductDetail() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-10">
      <ProductGallery />
      <div>
        <ProductInfo />
        <OptionsSelector />
        <AIAssistant />
        <Reviews />
      </div>
    </div>
  );
}
EOF

# Empty product components
touch src/components/product/{ProductGallery.tsx,ProductInfo.tsx,OptionsSelector.tsx,AIAssistant.tsx,Reviews.tsx}
for file in src/components/product/*.tsx; do
  name=$(basename "$file" .tsx)
  echo "export default function $name() { return <div>$name</div>; }" > "$file"
done

# lib files
touch src/lib/{api.ts,product.ts,ai.ts,formatter.ts}

# store files
touch src/store/{ProductContext.tsx,ReviewContext.tsx}

# types files
touch src/types/{product.ts,review.ts}

# styles
cat <<EOF > src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* custom styles here */
EOF

# config files
touch src/config/{site.ts,api.ts,constants.ts}

echo "✅ Project structure created successfully!"
