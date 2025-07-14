"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 3030;
app_1.default.listen(PORT, function () {
    console.log("\u2705 Backend server is running at: http://localhost:".concat(PORT));
});
