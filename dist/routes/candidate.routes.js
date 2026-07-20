"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const CandidateController_1 = require("../controllers/CandidateController");
const ValidationMiddleware_1 = require("../middleware/ValidationMiddleware");
const CandidateValidator_1 = require("../validators/CandidateValidator");
const CandidateValidator_2 = require("../validators/CandidateValidator");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(CandidateController_1.CandidateController);
router.get("/candidates", (req, res, next) => {
    res.set({
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store"
    });
    next();
}, controller.getAll);
router.get("/candidates", (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    // return data...
});
router.post("/candidate/create", ValidationMiddleware_1.ValidationMiddleware.validate(CandidateValidator_1.createCandidateSchema), controller.create);
router.patch("/candidates/:candidateId/stages/:stageId", ValidationMiddleware_1.ValidationMiddleware.validate(CandidateValidator_2.updateStageSchema), controller.updateStage);
router.patch("/candidates/:id", controller.delete);
exports.default = router;
