"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationMiddleware = void 0;
class AuthorizationMiddleware {
    static requireRole = (...allowedRoles) => {
        return (req, res, next) => {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: "Authentication required."
                });
                return;
            }
            console.log('userRole', req.user);
            // validate user
            const user = this;
            if (!allowedRoles.includes('ADMIN')) {
                res.status(403).json({
                    success: false,
                    message: "You do not have permission to perform this action."
                });
                return;
            }
            next();
        };
    };
}
exports.AuthorizationMiddleware = AuthorizationMiddleware;
