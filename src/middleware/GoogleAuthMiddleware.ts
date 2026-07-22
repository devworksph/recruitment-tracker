import { container } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { UserRole } from "../interface/IUser";
import {
    AuthenticationService
} from "../services/AuthenticationService"


const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

export interface AuthenticatedRequest extends Request {
    user?: {
        googleId: string;
        email: string;
        name: string;
        role: UserRole;
    };
}

export class GoogleAuthMiddleware {

    public static authenticate = async (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                res.status(401).json({
                    success: false,
                    message: "Authorization header is required."
                });

                return;
            }

            const [scheme, token] =
                authHeader.split(" ");

            if (
                scheme !== "Bearer" ||
                !token
            ) {
                res.status(401).json({
                    success: false,
                    message: "Invalid authorization format."
                });

                return;
            }

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = ticket.getPayload();

            if (!payload?.sub) {
                res.status(401).json({
                    success: false,
                    message: "Invalid Google account."
                });

                return;
            }

            const authenticationService =
                container.resolve(
                    AuthenticationService
                );

            const user =
                await authenticationService
                    .authenticate(
                        payload.email!
                    );


            if (!user) {
                res.status(403).json({
                    success: false,
                    message:
                        "Your account is not authorized."
                });

                return;
            }

            req.user = user;

            next();

        } catch (error) {

            console.error(
                "Google authentication failed:",
                error
            );

            res.status(401).json({
                success: false,
                message: "Invalid or expired Google token."
            });
        }
    };
}