import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "tsyringe";
import { CandidateService } from "../services/CandidateService";

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
        const candidateId = req.params.candidateId as unknown as string;
        const stageId = req.params.stageId as unknown as string;

        await this.service.updateStage(
            candidateId,
            stageId,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Stage updated."
        });
    };

    public delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = req.params.id as string;

            await this.service.delete(id);

            res.sendStatus(204);

        } catch (error) {
            next(error);
        }

    };
}