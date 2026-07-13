import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { CandidateService } from "../services/CandidateService";
import { CandidateStageService } from "../services/CandidateStageService";

@injectable()
export class CandidateController {

    constructor(
        @inject(CandidateService)
        private readonly service: CandidateService
    ) {}

    public getAll = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const candidates = await this.service.getAll();

        return res.json(candidates);
    };

    public create = async (
        req: Request,
        res: Response
    ) => {
        await this.service.create(req.body);
        
        return res.status(201).json({
            success: true,
            message: "Candidate created."
        });
    };

    public updateStage = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        await this.service.updateStage(
            req.params.candidateId,
            req.params.stageId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Stage updated."
        });
    };
}