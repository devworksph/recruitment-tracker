// container.ts

import "reflect-metadata";
import { container } from "tsyringe";

import { CandidateGateway } from "./gateways/CandidateGateway";
import { CandidateService } from "./services/CandidateService";

container.registerSingleton(CandidateGateway);
container.registerSingleton(CandidateService);

export { container };