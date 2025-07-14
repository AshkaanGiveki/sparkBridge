"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var reviewController_1 = require("../controllers/reviewController");
var router = express_1.default.Router({ mergeParams: true });
// GET /products/:id/reviews
router.get("/:id/reviews", reviewController_1.getReviewsByProduct);
// POST /products/:id/reviews
router.post("/:id/reviews", reviewController_1.postReview);
exports.default = router;
