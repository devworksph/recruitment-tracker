import { Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class StatusController {
    public getStatus = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        return res.status(200).json({
            success: true,
            status: "OK",
            timestamp: new Date().toISOString()
        });
    };
}