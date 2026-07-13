"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateGateway = void 0;
const tsyringe_1 = require("tsyringe");
const Database_1 = require("../database/Database");
const Stages_1 = require("../constants/Stages");
let CandidateGateway = class CandidateGateway {
    fieldMap = {
        status: "status",
        stageDate: "stage_date",
        remarks: "remarks"
    };
    async getAll() {
        const [rows] = await Database_1.db.execute(`
            SELECT
                c.id,
                c.name,
                c.recruiter,
                c.unit_manager,
                c.unit,
                c.created_at,
                s.stage_id,
                s.status,
                s.stage_date,
                s.remarks
            FROM candidates c
            LEFT JOIN candidate_stages s
                ON c.id = s.candidate_id
            ORDER BY c.created_at DESC, s.stage_id
            `);
        return rows;
    }
    ;
    async create(candidate) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.execute("INSERT INTO candidates (id, name, recruiter, unit_manager, unit, created_at) VALUES (?, ?, ?, ?, ?)", [
                candidate.id,
                candidate.name,
                candidate.recruiter,
                candidate.unitManager,
                candidate.unit,
                candidate.createdAt
            ]);
            // candidate stages
            const values = [];
            const placeholders = [];
            for (const stageId of Stages_1.DEFAULT_STAGES) {
                placeholders.push("(?, ?, ?, ?, ?)");
                values.push(candidate.id, stageId, "Not Started", null, "");
            }
            await conn.execute(`
                INSERT INTO candidate_stages
                (
                    candidate_id,
                    stage_id,
                    status,
                    stage_date,
                    remarks
                )
                VALUES
                ${placeholders.join(",")}
                `, values);
            await conn.commit();
        }
        catch (error) {
            await conn.rollback();
            throw error;
        }
        finally {
            conn.release();
        }
    }
    ;
    async updateStage(candidateId, stageId, field, value) {
        const column = this.fieldMap[field];
        if (!column) {
            throw new Error("Invalid field");
        }
        const sql = `
            UPDATE candidate_stages
            SET ${column} = ?
            WHERE candidate_id = ?
              AND stage_id = ?
        `;
        await Database_1.db.execute(sql, [
            value,
            candidateId,
            stageId
        ]);
    }
    ;
};
exports.CandidateGateway = CandidateGateway;
exports.CandidateGateway = CandidateGateway = __decorate([
    (0, tsyringe_1.injectable)()
], CandidateGateway);
