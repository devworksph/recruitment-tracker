"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateController = void 0;
const tsyringe_1 = require("tsyringe");
const CandidateService_1 = require("../services/CandidateService");
let CandidateController = class CandidateController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res) => {
        const candidates = await this.service.getAll();
        return res.json(candidates);
    };
    create = async (req, res) => {
        await this.service.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Candidate created."
        });
    };
    updateStage = async (req, res) => {
        const candidateId = req.params.candidateId;
        const stageId = req.params.stageId;
        await this.service.updateStage(candidateId, stageId, req.body);
        return res.status(200).json({
            success: true,
            message: "Stage updated."
        });
    };
};
exports.CandidateController = CandidateController;
exports.CandidateController = CandidateController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(CandidateService_1.CandidateService)),
    __metadata("design:paramtypes", [CandidateService_1.CandidateService])
], CandidateController);
