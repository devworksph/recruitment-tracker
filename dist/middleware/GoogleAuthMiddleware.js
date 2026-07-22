"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const google_auth_library_1 = require("google-auth-library");
const AuthenticationService_1 = require("../services/AuthenticationService");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class GoogleAuthMiddleware {
    static authenticate = async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    success: false,
                    message: "Authorization header is required."
                });
                return;
            }
            const [scheme, token] = authHeader.split(" ");
            if (scheme !== "Bearer" ||
                !token) {
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
            const authenticationService = tsyringe_1.container.resolve(AuthenticationService_1.AuthenticationService);
            const user = await authenticationService
                .authenticate(payload.email);
            if (!user) {
                res.status(403).json({
                    success: false,
                    message: "Your account is not authorized."
                });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Google authentication failed:", error);
            res.status(401).json({
                success: false,
                message: "Invalid or expired Google token."
            });
        }
    };
}
exports.GoogleAuthMiddleware = GoogleAuthMiddleware;
