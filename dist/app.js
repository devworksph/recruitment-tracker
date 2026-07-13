"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./container");
const status_routes_1 = __importDefault(require("./routes/status.routes"));
const candidate_routes_1 = __importDefault(require("./routes/candidate.routes"));
const app = (0, express_1.default)();
const baseRoute = '/api';
const allowedOrigins = [
    "http://localhost:8080",
    "https://sites.google.com",
    "https://*.googleusercontent.com"
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (Postman, curl, server-to-server)
        if (!origin) {
            return callback(null, true);
        }
        const isAllowed = allowedOrigins.includes(origin) ||
            origin.endsWith(".googleusercontent.com");
        if (isAllowed) {
            return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
}));
app.use(express_1.default.json());
app.use(baseRoute, status_routes_1.default);
app.use(baseRoute, candidate_routes_1.default);
exports.default = app;
