import { Router } from "express";
import { container } from "tsyringe";
import { CandidateController } from "../controllers/CandidateController";
import { ValidationMiddleware } from "../middleware/ValidationMiddleware";
import { createCandidateSchema } from "../validators/CandidateValidator";
import { updateStageSchema } from "../validators/CandidateValidator";
import { GoogleAuthMiddleware } from "../middleware/GoogleAuthMiddleware";
import { AuthorizationMiddleware } from "../middleware/AuthorizationMiddleware";

const router = Router();
const controller = container.resolve(CandidateController);

router.get(
    "/candidates",
    (req, res, next) => {
        res.set({
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Surrogate-Control": "no-store"
        });

        next();
    },
    controller.getAll
);

router.get("/candidates", (req, res) => {
    res.setHeader("Cache-Control", "no-store");

    // return data...
});

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

router.patch(
    "/candidates/:id",
    GoogleAuthMiddleware.authenticate,
    AuthorizationMiddleware.requireRole(
        "ADMIN"
    ),
    controller.delete
);

export default router;