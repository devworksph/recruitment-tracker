"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStageSchema = exports.createCandidateSchema = void 0;
exports.createCandidateSchema = {
    type: "object",
    required: ["id", "name", "createdAt"],
    properties: {
        id: {
            type: "string"
        },
        name: {
            type: "string",
            minLength: 1
        },
        recruiter: {
            type: "string"
        },
        unitManager: {
            type: "string"
        },
        unit: {
            type: "string"
        },
        createdAt: {
            type: "string"
        }
    }
};
exports.updateStageSchema = {
    type: "object",
    required: ["field", "value"],
    properties: {
        field: {
            type: "string",
            enum: [
                "status",
                "date",
                "remarks"
            ]
        },
        value: {
            type: "string"
        }
    }
};
