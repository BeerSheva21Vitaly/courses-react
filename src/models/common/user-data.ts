// информация о пользователе для UI

export const nonAuthorizedUser: UserData = {
    username: "",
    isAdmin: false,
    displayName: "Non authorized user"
}

export type UserData = {
    username: string;
    isAdmin: boolean;
    displayName: string;
}