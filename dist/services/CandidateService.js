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
exports.CandidateService = void 0;
const tsyringe_1 = require("tsyringe");
const CandidateGateway_1 = require("../gateways/CandidateGateway");
let CandidateService = class CandidateService {
    gateway;
    constructor(gateway) {
        this.gateway = gateway;
    }
    async getAll() {
        const rows = await this.gateway.getAll();
        const candidates = new Map();
        for (const row of rows) {
            if (!candidates.has(row.id)) {
                candidates.set(row.id, {
                    id: row.id,
                    name: row.name,
                    recruiter: row.recruiter,
                    unitManager: row.unit_manager,
                    unit: row.unit,
                    createdAt: row.created_at,
                    stages: {}
                });
            }
            const candidate = candidates.get(row.id);
            candidate.stages[row.stage_id] = {
                status: row.status,
                date: row.stage_date,
                remarks: row.remarks
            };
        }
        return Array.from(candidates.values());
    }
    async create(dto) {
        await this.gateway.create(dto);
    }
    async updateStage(candidateId, stageId, dto) {
        await this.gateway.updateStage(candidateId, stageId, dto.field, dto.value);
    }
};
exports.CandidateService = CandidateService;
exports.CandidateService = CandidateService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(CandidateGateway_1.CandidateGateway)),
    __metadata("design:paramtypes", [CandidateGateway_1.CandidateGateway])
], CandidateService);
