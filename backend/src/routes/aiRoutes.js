"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var aiController_1 = require("../controllers/aiController");
var router = express_1.default.Router();
// POST /ai/summary
router.post("/summary", aiController_1.generateProductSummary);
exports.default = router;
