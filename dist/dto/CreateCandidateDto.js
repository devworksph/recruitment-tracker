"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStageDto = exports.CreateCandidateDto = void 0;
class CreateCandidateDto {
    id;
    name;
    recruiter;
    unitManager;
    unit;
    createdAt;
}
exports.CreateCandidateDto = CreateCandidateDto;
class UpdateStageDto {
    field;
    value;
}
exports.UpdateStageDto = UpdateStageDto;
