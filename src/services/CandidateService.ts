import { inject, injectable } from "tsyringe";
import { CandidateGateway } from "../gateways/CandidateGateway";
import { CreateCandidateDto, UpdateStageDto } from "../dto/CreateCandidateDto";

@injectable()
export class CandidateService {

    constructor(
        @inject(CandidateGateway)
        private readonly gateway: CandidateGateway
    ) {}

    public async getAll(): Promise<any[]> {
        const rows = await this.gateway.getAll();
        const candidates = new Map<string, any>();
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

    public async create(dto: CreateCandidateDto) {
        await this.gateway.create(dto);
    }

    public async updateStage(
        candidateId: string,
        stageId: string,
        dto: UpdateStageDto
    ): Promise<void> {
        await this.gateway.updateStage(
            candidateId,
            stageId,
            dto.field,
            dto.value
        );
    }
}