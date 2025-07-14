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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductSummary = generateProductSummary;
var openai_1 = require("openai");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
/**
 * POST /ai/summary
 * Body: { description: string, reviews: string[] }
 */
function generateProductSummary(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, description, reviews, prompt, chat, summary, error_1;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.body, description = _a.description, reviews = _a.reviews;
                    if (!description || !Array.isArray(reviews)) {
                        return [2 /*return*/, res.status(400).json({ error: "Invalid input. Provide description and reviews[]" })];
                    }
                    prompt = "\nYou are an assistant that writes product summaries for an e-commerce website.\n\nPlease generate the following, based on the product description and real user reviews provided:\n\n1. **Product Summary**: A short, engaging paragraph that describes the product\u2019s core features and appeal. Avoid technical jargon unless essential.\n2. **Positive Points**: A bulleted list of strengths or highlights mentioned in the reviews.\n3. **Negative Points**: A bulleted list of drawbacks, complaints, or areas of improvement based on the reviews.\n4. **Overall Purchase Experience**: Write a brief paragraph (2\u20133 sentences) summarizing what buying and using this product feels like based on customer feedback.\n\n### Product Description:\n".concat(description, "\n\n### User Reviews:\n").concat(reviews.map(function (r, i) { return "Review ".concat(i + 1, ": \"").concat(r, "\""); }).join("\n"), "\n");
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: "gpt-4o-mini",
                            messages: [{ role: "user", content: prompt }],
                            temperature: 0.7,
                            max_tokens: 700,
                        })];
                case 2:
                    chat = _e.sent();
                    summary = (_d = (_c = (_b = chat.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.trim();
                    return [2 /*return*/, res.json({ summary: summary })];
                case 3:
                    error_1 = _e.sent();
                    console.error("AI summary error:", error_1);
                    // Fallback summary if in development
                    if (process.env.NODE_ENV !== "production") {
                        return [2 /*return*/, res.json({
                                summary: "این محصول از دید کاربران کیفیت و عملکرد قابل قبولی دارد و ارزش خرید بالایی دارد.",
                            })];
                    }
                    return [2 /*return*/, res.status(500).json({ error: "AI summary generation failed." })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
