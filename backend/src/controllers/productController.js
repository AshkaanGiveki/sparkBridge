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
exports.getProductById = getProductById;
exports.getProductsList = getProductsList;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, product, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.product.findUnique({
                            where: { id: id },
                            include: {
                                brand: true,
                                category: {
                                    include: {
                                        options: {
                                            include: {
                                                values: {
                                                    include: {
                                                        color: true, // get hexCode here
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                selectedOptions: {
                                    include: {
                                        value: {
                                            include: {
                                                option: true,
                                                color: true, // include color here as well
                                            },
                                        },
                                    },
                                },
                                reviews: {
                                    orderBy: { createdAt: "desc" },
                                },
                                images: true,
                            },
                        })];
                case 2:
                    product = _a.sent();
                    if (!product) {
                        return [2 /*return*/, res.status(404).json({ error: "Product not found." })];
                    }
                    return [2 /*return*/, res.json(product)];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching product:", error_1);
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error." })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * GET /products
 * Fetch all products (summary list)
 */
function getProductsList(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var products, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, prisma.product.findMany({
                            orderBy: { createdAt: "desc" },
                            include: {
                                brand: true,
                                images: true, // assuming you store image URLs in a separate table
                            },
                        })];
                case 1:
                    products = _a.sent();
                    return [2 /*return*/, res.json(products)];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching products list:", error_2);
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error." })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
