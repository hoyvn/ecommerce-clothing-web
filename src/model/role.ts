export const UserRoleModel  = {
    Admin: 'admin',
    Customer: 'customer',
    Vendor: 'vendor'
} as const;

export type UserRoleModel = typeof UserRoleModel[keyof typeof UserRoleModel];
