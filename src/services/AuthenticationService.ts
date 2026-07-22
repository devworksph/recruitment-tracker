import { injectable, inject } from "tsyringe";

import { UserGateway } from "../gateways/UserGateway";

@injectable()
export class AuthenticationService {

    constructor(
        @inject(UserGateway)
        private readonly userGateway: UserGateway
    ) {}

    public async authenticate(
        email: string
    ) {
        console.log('email', email);
        return this.userGateway.findByGoogleEmail(
            email
        );
    }
}