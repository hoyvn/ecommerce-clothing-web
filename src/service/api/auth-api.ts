import axios from "axios";
import type { AxiosInstance } from "axios";
import { environment } from "../../congif/env.ts";
import type { ApiResponse } from "../../model/api-response";
import type { RegisterRequestModel } from "../../model/user-manage/register.request";
import type { UserRoleModel } from "../../model/role.ts";

export class AuthApiService {
    private http: AxiosInstance;
    private apiUrl = environment.baseUrl + '/api/auth';

    constructor() {
        this.http = axios.create({
            baseURL: this.apiUrl,
            headers: { "Content-Type": "application/json" }
        })
    }

    async login(username: string, password: string, role: UserRoleModel): Promise<ApiResponse<{ token: string}>> {
        const loginData = { username, password, role };
        const res = await this.http.post<ApiResponse<{token: string}>>(
            `${this.apiUrl}/login`, loginData
        )
        return res.data;
    }

    /**
     * 傳送註冊資料至後端以建立新用戶帳戶。
     * @param registerData - 用戶註冊資料
     * @return Promise 包含回應狀態與訊息
     */
    async register(registerData: RegisterRequestModel): Promise<ApiResponse<null>> {
        const res = (await this.http.post<ApiResponse<null>>(
            `${this.apiUrl}/register`, registerData)
        );
        return res.data;
    }

    /**
     * 透過傳送用戶名和角色至後端來檢查用戶是否存在。
     * @param username - 用戶名稱
     * @param role - 用戶角色
     * @returns Promise，包含回應狀態與訊息
     */
    async checkUser(username: string, role: UserRoleModel): Promise<ApiResponse<null>> {
        const checkData = { username, role };
        const res = await this.http.post<ApiResponse<null>>(`${this.apiUrl}/checkUser`, checkData);
        return res.data;
    }
};
