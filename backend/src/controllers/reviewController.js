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
exports.getReviewsByProduct = getReviewsByProduct;
exports.postReview = postReview;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
/**
 * GET /products/:id/reviews
 * Returns all reviews for a product
 */
function getReviewsByProduct(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, reviews, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.review.findMany({
                            where: { productId: id },
                            orderBy: { createdAt: "desc" },
                        })];
                case 2:
                    reviews = _a.sent();
                    return [2 /*return*/, res.json(reviews)];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching reviews:", error_1);
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error." })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * POST /products/:id/reviews
 * Create a new review for a product
 * Body should include: name, comment, rating (1-5)
 */
function postReview(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, name, comment, rating, newReview, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, name = _a.name, comment = _a.comment, rating = _a.rating;
                    if (!name || !comment || typeof rating !== "number") {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid review data." })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.review.create({
                            data: {
                                productId: id,
                                name: name,
                                comment: comment,
                                rating: rating,
                            },
                        })];
                case 2:
                    newReview = _b.sent();
                    return [2 /*return*/, res.status(201).json(newReview)];
                case 3:
                    error_2 = _b.sent();
                    console.error("Error posting review:", error_2);
                    return [2 /*return*/, res.status(500).json({ error: "Internal server error." })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
