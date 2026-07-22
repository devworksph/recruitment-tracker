import express from "express";
import cors from "cors";
import "./container";

import statusRoutes from "./routes/status.routes";
import candidateRoutes from "./routes/candidate.routes";

const app = express();
const baseRoute = '/api';

const allowedOrigins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "https://sites.google.com",
    "https://*.googleusercontent.com",
    "https://stage-recruitment.devworksph.com"
];

app.use(cors({
    origin: (origin, callback) => {

        // Allow requests with no origin (Postman, curl, server-to-server)
        if (!origin) {
            return callback(null, true);
        }

        const isAllowed =
            allowedOrigins.includes(origin) ||
            origin.endsWith(".googleusercontent.com");

        if (isAllowed) {
            return callback(null, true);
        }

        return callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
}));

app.use(express.json());

app.use(baseRoute, statusRoutes);
app.use(baseRoute, candidateRoutes);

export default app;