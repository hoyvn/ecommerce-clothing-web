export interface UserProfileModel {
    id:number;
    email:string;
    role:string
    establishDate:number;
    isActive:boolean;
}

// 用戶資料
export interface EditUserProfileModel {
    email: string;
    phoneNumber: string;
    password: string;
}

// 可更動用戶資料
export interface UserUpdatableInfoDTO {
    email: string;
    phoneNumber: string;
    password: string;
}

