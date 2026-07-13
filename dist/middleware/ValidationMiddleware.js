"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
class ValidationMiddleware {
    static validate(schema) {
        const validate = ajv.compile(schema);
        return (req, res, next) => {
            const valid = validate(req.body);
            if (!valid) {
                return res.status(400).json({
                    success: false,
                    errors: validate.errors
                });
            }
            next();
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
