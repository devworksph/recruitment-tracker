import { Router } from "express";
import { container } from "tsyringe";
import { CandidateController } from "../controllers/CandidateController";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import { createCandidateSchema } from "../validators/CandidateValidator";
import { updateStageSchema } from "../validators/CandidateValidator";

const router = Router();
const controller = container.resolve(CandidateController);

router.get(
    "/candidates",
    controller.getAll
);

router.post(
    "/candidate/create",
    ValidationMiddleware.validate(createCandidateSchema),
    controller.create
);

router.patch(
    "/candidates/:candidateId/stages/:stageId",
    ValidationMiddleware.validate(updateStageSchema),
    controller.updateStage
);

export default router;