import { injectable } from "inversify";
import axios from "axios";

export interface IApiService {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: any): Promise<T>;
}

@injectable()
export class ApiService implements IApiService {
    private client = axios.create({
        baseURL: "http://localhost:5001",
    });

    async get<T>(url: string): Promise<T> {
        const response = await this.client.get<T>(url);
        return response.data;
    }

    async post<T>(url: string, data: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }
}
