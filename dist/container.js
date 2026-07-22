"use strict";
// container.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const CandidateGateway_1 = require("./gateways/CandidateGateway");
const CandidateService_1 = require("./services/CandidateService");
tsyringe_1.container.registerSingleton(CandidateGateway_1.CandidateGateway);
tsyringe_1.container.registerSingleton(CandidateService_1.CandidateService);
