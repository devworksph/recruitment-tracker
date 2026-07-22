"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGateway = void 0;
const tsyringe_1 = require("tsyringe");
const Database_1 = require("../database/Database");
let UserGateway = class UserGateway {
    async findByGoogleEmail(email) {
        const [rows] = await Database_1.db.execute(`
            SELECT
                id,
                google_id AS googleId,
                email,
                name,
                role
            FROM users
            WHERE email = ?
            LIMIT 1
            `, [email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
};
exports.UserGateway = UserGateway;
exports.UserGateway = UserGateway = __decorate([
    (0, tsyringe_1.injectable)()
], UserGateway);
