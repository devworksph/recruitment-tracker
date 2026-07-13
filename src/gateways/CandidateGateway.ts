import { injectable } from "tsyringe";
import { RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import { db } from "../database/Database";
import { ICandidate } from "../interface/ICandidate";
import { DEFAULT_STAGES } from "../constants/Stages";

@injectable()
export class CandidateGateway {

    private readonly fieldMap: Record<string, string> = {
        status: "status",
        stageDate: "stage_date",
        remarks: "remarks"
    };

    public async getAll(): Promise<any[]> {
        const [rows] = await db.execute<(RowDataPacket & any)[]>(
            `
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
            `
        );

        return rows;
    };

    public async create(candidate: ICandidate): Promise<void> {
        const conn: PoolConnection = await db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.execute(
                `
                INSERT INTO candidates
                (
                    id,
                    name,
                    recruiter,
                    unit_manager,
                    unit,
                    created_at
                )
                VALUES
                (?, ?, ?, ?, ?, ?)
                `,
                [
                    candidate.id,
                    candidate.name,
                    candidate.recruiter,
                    candidate.unitManager,
                    candidate.unit,
                    candidate.createdAt
                ]
            );

            // candidate stages
            const values: unknown[] = [];
            const placeholders: string[] = [];
            for (const stageId of DEFAULT_STAGES) {

                placeholders.push("(?, ?, ?, ?, ?)");

                values.push(
                    candidate.id,
                    stageId,
                    "Not Started",
                    null,
                    ""
                );
            }

            await conn.execute(
                `
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
                `,
                values
            );

            await conn.commit();
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    };

    public async updateStage(
        candidateId: string,
        stageId: string,
        field: string,
        value: string
    ): Promise<void> {

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

        await db.execute(sql, [
            value,
            candidateId,
            stageId
        ]);
    };
}