import { UserRoleModel } from "../role.ts";

export interface RegisterRequestModel {
    username: string;
    email: string;
    password: string;
    role: UserRoleModel;
}