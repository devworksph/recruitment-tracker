import {
    Response,
    NextFunction
} from "express";

import {
    AuthenticatedRequest
} from "./GoogleAuthMiddleware";

import { UserRole } from "../interface/IUser";

export class AuthorizationMiddleware {

    public static requireRole = (
        ...allowedRoles: UserRole[]
    ) => {

        return (
            req: AuthenticatedRequest,
            res: Response,
            next: NextFunction
        ): void => {

            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: "Authentication required."
                });

                return;
            }

            console.log('userRole', req.user);
            // validate user
            const user = this

            if (
                !allowedRoles.includes(
                    'ADMIN'
                )
            ) {
                res.status(403).json({
                    success: false,
                    message:
                        "You do not have permission to perform this action."
                });

                return;
            }

            next();
        };
    };
}