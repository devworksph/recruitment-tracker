import { Router } from "express";
import { container } from "tsyringe";
import { StatusController } from "../controllers/StatusController";

const router = Router();
const controller = container.resolve(StatusController);

router.get("/status", controller.getStatus);

export default router;