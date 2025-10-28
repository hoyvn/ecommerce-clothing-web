import Cookies from 'js-cookie'

import type { UserRoleModel } from "../../model/role.ts";
import type { RegisterRequestModel} from "../../model/user-manage/register.request.ts";
import { AuthApiService } from "../api/auth-api.ts";

export class AuthService {
    private static readonly TOKEN_KEY = "token"

    private authApiService = new AuthApiService();

    /**
     * 執行用戶登入流程，將憑證傳送到後端。
     * 若登入成功則將 JWT token 儲存於 cookie 中。
     * @param username - 用戶名稱
     * @param password - 用戶密碼
     * @param role - 用戶角色
     * @returns Promise<boolean> - 登入成功回傳 true，失敗回傳 false
     */
    async login(username: string, password: string, role: UserRoleModel): Promise<boolean> {
        try {
            const res = await this.authApiService.login(username, password, role);
            if (res.status && res.data?.token) {
                Cookies.set(AuthService.TOKEN_KEY, res.data.token, { path: '/', sameSite: 'Lax'});
                return true;
            }
            return false;
        } catch (error) {
            console.error('登入失敗', error);
            return false;
        }
    }

    /**
     * 檢查具有指定用戶名和角色的用戶是否存在。
     * @param username - 用戶名稱
     * @param role - 用戶角色
     * @returns Promise - 若用戶存在回傳 true，否則回傳 false
     */
    async checkUser(username: string, role: UserRoleModel): Promise<boolean> {
        try {
             const res = await this.authApiService.checkUser(username, role);
             return res.status;
        } catch (error) {
            console.error('檢查用戶失敗', error);
            return false;
        }
    }

    /**
     * 使用提供的詳細資料註冊新用戶。
     */
    async registerDetails(registerData: RegisterRequestModel): Promise<boolean> {
        try {
            const res = await this.authApiService.register(registerData)
            return res.status
        } catch (error) {
            console.error("註冊失敗", error)
            return false
        }
    }

    /**
     * 從 cookie 中取得 JWT token。
     */
    getToken(): string | null{
        return Cookies.get(AuthService.TOKEN_KEY) ?? null;
    }

    /**
     * 執行登出，從 cookie 中刪除 JWT token。
     */
    logout(): void {
        Cookies.remove(AuthService.TOKEN_KEY);
    }
}