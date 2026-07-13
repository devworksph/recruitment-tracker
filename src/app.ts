import express from "express";
import cors from "cors";
import "./container";

import statusRoutes from "./routes/status.routes";
import candidateRoutes from "./routes/candidate.routes";

const app = express();
const baseRoute = '/api';

app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://sites.google.com/view/t2lia-g-site-for-leaders/recruitment/recruitment-tracker'
    ]
}));
app.use(express.json());

app.use(baseRoute, statusRoutes);
app.use(baseRoute, candidateRoutes);

export default app;