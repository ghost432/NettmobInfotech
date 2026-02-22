import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { ApiService } from "./services/ApiService";
import type { IApiService } from "./services/ApiService";

const container = new Container();

container.bind<IApiService>(TYPES.ApiService).to(ApiService);

export { container };
