export type User = {
    id: number;
    displayName: string;
    email: string;
    token: string;
    imageUrl?: string;
}

export type LoginCred = {
    email: string;
    password: string;
}

export type RegisterCred = {
    displayName: string;
    email: string;
    password: string;
}
