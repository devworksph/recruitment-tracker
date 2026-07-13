export class CreateCandidateDto {
    id!: string;
    name!: string;
    recruiter?: string;
    unitManager?: string;
    unit?: string;
    createdAt!: string;
}

export class UpdateStageDto {
    field!: "status" | "stageDate" | "remarks";
    value!: string;
}