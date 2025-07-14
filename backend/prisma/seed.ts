import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Colors ---
  const colorsData = [
    { name: "Black", hexCode: "#000000" },
    { name: "Silver", hexCode: "#C0C0C0" },
    { name: "Purple", hexCode: "#800080" },
    { name: "White", hexCode: "#FFFFFF" },
    { name: "Midnight", hexCode: "#191970" },
    { name: "Starlight", hexCode: "#F0E68C" },
  ];

  const colors = await Promise.all(
    colorsData.map((c) =>
      prisma.color.upsert({
        where: { name: c.name },
        update: {},
        create: c,
      })
    )
  );

  // --- Brands ---
  const [apple, samsung, sony, dell] = await Promise.all([
    prisma.brand.upsert({ where: { name: "Apple" }, update: {}, create: { name: "Apple" } }),
    prisma.brand.upsert({ where: { name: "Samsung" }, update: {}, create: { name: "Samsung" } }),
    prisma.brand.upsert({ where: { name: "Sony" }, update: {}, create: { name: "Sony" } }),
    prisma.brand.upsert({ where: { name: "Dell" }, update: {}, create: { name: "Dell" } }),
  ]);

  // --- Categories ---
  const [smartphones, laptops, headphones, smartwatches] = await Promise.all([
    prisma.category.upsert({ where: { name: "Smartphones" }, update: {}, create: { name: "Smartphones" } }),
    prisma.category.upsert({ where: { name: "Laptops" }, update: {}, create: { name: "Laptops" } }),
    prisma.category.upsert({ where: { name: "Headphones" }, update: {}, create: { name: "Headphones" } }),
    prisma.category.upsert({ where: { name: "Smartwatches" }, update: {}, create: { name: "Smartwatches" } }),
  ]);

  // --- Options + Values ---
  async function createOption(categoryId: string, name: string, values: string[]) {
    const option = await prisma.option.create({
      data: {
        name,
        categoryId,
        values: {
          create: values.map((value) => ({ value })),
        },
      },
      include: { values: true },
    });
    return option;
  }

  // Using color names from the colors table for Color options:
  const smartphoneColor = await createOption(
    smartphones.id,
    "Color",
    colors.filter(c => ["Black", "Silver", "Purple"].includes(c.name)).map(c => c.name)
  );
  const smartphoneStorage = await createOption(smartphones.id, "Storage", ["128GB", "256GB", "512GB"]);

  const laptopRam = await createOption(laptops.id, "RAM", ["8GB", "16GB", "32GB"]);
  const laptopStorage = await createOption(laptops.id, "SSD", ["256GB", "512GB", "1TB"]);

  const headphoneConnectivity = await createOption(headphones.id, "Connectivity", ["Bluetooth 5.0", "Bluetooth 5.3"]);
  const headphoneColor = await createOption(headphones.id, "Color", ["Black", "White"]);

  const watchBand = await createOption(smartwatches.id, "Band Type", ["Silicone", "Leather"]);
  const watchColor = await createOption(smartwatches.id, "Color", ["Midnight", "Starlight"]);

  // --- Products ---
  const products = [
    {
      name: "iPhone 15 Pro",
      description: "Apple's flagship phone with A17 Pro chip and titanium frame.",
      price: 1399.99,
      brandId: apple.id,
      categoryId: smartphones.id,
      options: [smartphoneColor.values[0], smartphoneStorage.values[2]], // Black, 512GB
      images: [
        "iphone-1.jpg",
        "iphone-2.jpg",
        "iphone-3.jpg",
        "iphone-4.jpg",
        "iphone-5.jpg",
      ],
      reviews: [
        { name: "Alice", comment: "Love the performance and camera!", rating: 5 },
        { name: "Bob", comment: "Battery life could be better.", rating: 4 },
      ],
    },
    {
      name: "Galaxy S24 Ultra",
      description: "Samsung’s top-tier Android with 200MP camera and S-Pen.",
      price: 1299.99,
      brandId: samsung.id,
      categoryId: smartphones.id,
      options: [smartphoneColor.values[2], smartphoneStorage.values[1]], // Purple, 256GB
      images: [
        "S24-1.jpg",
        "S24-2.jpg",
        "S24-3.jpg",
        "S24-4.jpg",
        "S24-5.jpg",
        "S24-6.jpg",
      ],
      reviews: [
        { name: "Carol", comment: "Excellent display and S-Pen functionality.", rating: 5 },
        { name: "Dave", comment: "A bit pricey but worth it.", rating: 4 },
      ],
    },
    {
      name: "Sony WH-1000XM5",
      description: "Industry-leading noise cancelling over-ear headphones.",
      price: 399.99,
      brandId: sony.id,
      categoryId: headphones.id,
      options: [headphoneConnectivity.values[1], headphoneColor.values[0]], // Bluetooth 5.3, Black
      images: [
        "Sony-1.jpg",
        "Sony-2.jpg",
        "Sony-3.jpg",
        "Sony-4.jpg",
        "Sony-5.jpg",
      ],
      reviews: [
        { name: "Eve", comment: "Best noise cancellation I've ever used.", rating: 5 },
        { name: "Frank", comment: "Comfortable for long wear.", rating: 4 },
      ],
    },
    {
      name: "Apple Watch Series 9",
      description: "Powerful smartwatch with S9 SiP and gesture control.",
      price: 499.99,
      brandId: apple.id,
      categoryId: smartwatches.id,
      options: [watchColor.values[1], watchBand.values[0]], // Starlight, Silicone
      images: [
        "Apple-1.jpg",
        "Apple-2.jpg",
        "Apple-3.jpg",
        "Apple-4.jpg",
        "Apple-5.jpg",
        "Apple-6.jpg",
      ],
      reviews: [
        { name: "Grace", comment: "Love the new gesture controls!", rating: 5 },
        { name: "Hank", comment: "Battery life improved.", rating: 4 },
      ],
    },
    {
      name: "Dell XPS 13 Plus",
      description: "Ultraportable laptop with edge-to-edge keyboard and OLED display.",
      price: 1799.99,
      brandId: dell.id,
      categoryId: laptops.id,
      options: [laptopRam.values[1], laptopStorage.values[2]], // 16GB RAM, 1TB SSD
      images: [
        "Dell-1.jpg",
        "Dell-2.jpg",
        "Dell-3.jpg",
        "Dell-4.jpg",
        "Dell-5.jpg",
      ],
      reviews: [
        { name: "Ivy", comment: "Compact and powerful.", rating: 5 },
        { name: "Jack", comment: "Keyboard could be better.", rating: 3 },
      ],
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });

    let createdProduct;
    if (!existing) {
      createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          brandId: product.brandId,
          categoryId: product.categoryId,
        },
      });

      // Link options
      for (const value of product.options) {
        await prisma.selectedOption.create({
          data: {
            productId: createdProduct.id,
            optionValueId: value.id,
          },
        });
      }

      // Add images
      for (const url of product.images) {
        await prisma.image.create({
          data: {
            imageName: url,
            productId: createdProduct.id,
          },
        });
      }

      // Add reviews
      for (const rev of product.reviews) {
        await prisma.review.create({
          data: {
            productId: createdProduct.id,
            name: rev.name,
            comment: rev.comment,
            rating: rev.rating,
          },
        });
      }
    }
  }

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
