import { injectable } from "tsyringe";
import { RowDataPacket } from "mysql2";

import { db } from "../database/Database";
import { IUser } from "../interface/IUser";

@injectable()
export class UserGateway {

    public async findByGoogleEmail(
        email: string
    ): Promise<IUser | null> {

        const [rows] = await db.execute<
            (RowDataPacket & IUser)[]
        >(
            `
            SELECT
                id,
                google_id AS googleId,
                email,
                name,
                role
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
            [email]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    }
}