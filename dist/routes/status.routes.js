"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const StatusController_1 = require("../controllers/StatusController");
const router = (0, express_1.Router)();
const controller = tsyringe_1.container.resolve(StatusController_1.StatusController);
router.get("/status", controller.getStatus);
exports.default = router;
