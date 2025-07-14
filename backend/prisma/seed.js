"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        // --- Options + Values ---
        function createOption(categoryId, name, values) {
            return __awaiter(this, void 0, void 0, function () {
                var option;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma.option.create({
                                data: {
                                    name: name,
                                    categoryId: categoryId,
                                    values: {
                                        create: values.map(function (value) { return ({ value: value }); }),
                                    },
                                },
                                include: { values: true },
                            })];
                        case 1:
                            option = _a.sent();
                            return [2 /*return*/, option];
                    }
                });
            });
        }
        var colorsData, colors, _a, apple, samsung, sony, dell, _b, smartphones, laptops, headphones, smartwatches, smartphoneColor, smartphoneStorage, laptopRam, laptopStorage, headphoneConnectivity, headphoneColor, watchBand, watchColor, products, _i, products_1, product, existing, createdProduct, _c, _d, value, _e, _f, url, _g, _h, rev;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log("🌱 Seeding database...");
                    colorsData = [
                        { name: "Black", hexCode: "#000000" },
                        { name: "Silver", hexCode: "#C0C0C0" },
                        { name: "Purple", hexCode: "#800080" },
                        { name: "White", hexCode: "#FFFFFF" },
                        { name: "Midnight", hexCode: "#191970" },
                        { name: "Starlight", hexCode: "#F0E68C" },
                    ];
                    return [4 /*yield*/, Promise.all(colorsData.map(function (c) {
                            return prisma.color.upsert({
                                where: { name: c.name },
                                update: {},
                                create: c,
                            });
                        }))];
                case 1:
                    colors = _j.sent();
                    return [4 /*yield*/, Promise.all([
                            prisma.brand.upsert({ where: { name: "Apple" }, update: {}, create: { name: "Apple" } }),
                            prisma.brand.upsert({ where: { name: "Samsung" }, update: {}, create: { name: "Samsung" } }),
                            prisma.brand.upsert({ where: { name: "Sony" }, update: {}, create: { name: "Sony" } }),
                            prisma.brand.upsert({ where: { name: "Dell" }, update: {}, create: { name: "Dell" } }),
                        ])];
                case 2:
                    _a = _j.sent(), apple = _a[0], samsung = _a[1], sony = _a[2], dell = _a[3];
                    return [4 /*yield*/, Promise.all([
                            prisma.category.upsert({ where: { name: "Smartphones" }, update: {}, create: { name: "Smartphones" } }),
                            prisma.category.upsert({ where: { name: "Laptops" }, update: {}, create: { name: "Laptops" } }),
                            prisma.category.upsert({ where: { name: "Headphones" }, update: {}, create: { name: "Headphones" } }),
                            prisma.category.upsert({ where: { name: "Smartwatches" }, update: {}, create: { name: "Smartwatches" } }),
                        ])];
                case 3:
                    _b = _j.sent(), smartphones = _b[0], laptops = _b[1], headphones = _b[2], smartwatches = _b[3];
                    return [4 /*yield*/, createOption(smartphones.id, "Color", colors.filter(function (c) { return ["Black", "Silver", "Purple"].includes(c.name); }).map(function (c) { return c.name; }))];
                case 4:
                    smartphoneColor = _j.sent();
                    return [4 /*yield*/, createOption(smartphones.id, "Storage", ["128GB", "256GB", "512GB"])];
                case 5:
                    smartphoneStorage = _j.sent();
                    return [4 /*yield*/, createOption(laptops.id, "RAM", ["8GB", "16GB", "32GB"])];
                case 6:
                    laptopRam = _j.sent();
                    return [4 /*yield*/, createOption(laptops.id, "SSD", ["256GB", "512GB", "1TB"])];
                case 7:
                    laptopStorage = _j.sent();
                    return [4 /*yield*/, createOption(headphones.id, "Connectivity", ["Bluetooth 5.0", "Bluetooth 5.3"])];
                case 8:
                    headphoneConnectivity = _j.sent();
                    return [4 /*yield*/, createOption(headphones.id, "Color", ["Black", "White"])];
                case 9:
                    headphoneColor = _j.sent();
                    return [4 /*yield*/, createOption(smartwatches.id, "Band Type", ["Silicone", "Leather"])];
                case 10:
                    watchBand = _j.sent();
                    return [4 /*yield*/, createOption(smartwatches.id, "Color", ["Midnight", "Starlight"])];
                case 11:
                    watchColor = _j.sent();
                    products = [
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
                    _i = 0, products_1 = products;
                    _j.label = 12;
                case 12:
                    if (!(_i < products_1.length)) return [3 /*break*/, 27];
                    product = products_1[_i];
                    return [4 /*yield*/, prisma.product.findFirst({ where: { name: product.name } })];
                case 13:
                    existing = _j.sent();
                    createdProduct = void 0;
                    if (!!existing) return [3 /*break*/, 26];
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                brandId: product.brandId,
                                categoryId: product.categoryId,
                            },
                        })];
                case 14:
                    createdProduct = _j.sent();
                    _c = 0, _d = product.options;
                    _j.label = 15;
                case 15:
                    if (!(_c < _d.length)) return [3 /*break*/, 18];
                    value = _d[_c];
                    return [4 /*yield*/, prisma.selectedOption.create({
                            data: {
                                productId: createdProduct.id,
                                optionValueId: value.id,
                            },
                        })];
                case 16:
                    _j.sent();
                    _j.label = 17;
                case 17:
                    _c++;
                    return [3 /*break*/, 15];
                case 18:
                    _e = 0, _f = product.images;
                    _j.label = 19;
                case 19:
                    if (!(_e < _f.length)) return [3 /*break*/, 22];
                    url = _f[_e];
                    return [4 /*yield*/, prisma.image.create({
                            data: {
                                imageName: url,
                                productId: createdProduct.id,
                            },
                        })];
                case 20:
                    _j.sent();
                    _j.label = 21;
                case 21:
                    _e++;
                    return [3 /*break*/, 19];
                case 22:
                    _g = 0, _h = product.reviews;
                    _j.label = 23;
                case 23:
                    if (!(_g < _h.length)) return [3 /*break*/, 26];
                    rev = _h[_g];
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                productId: createdProduct.id,
                                name: rev.name,
                                comment: rev.comment,
                                rating: rev.rating,
                            },
                        })];
                case 24:
                    _j.sent();
                    _j.label = 25;
                case 25:
                    _g++;
                    return [3 /*break*/, 23];
                case 26:
                    _i++;
                    return [3 /*break*/, 12];
                case 27:
                    console.log("✅ Seed complete.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error("❌ Seed failed:", e);
    process.exit(1);
})
    .finally(function () { return prisma.$disconnect(); });
