export type UserRole =
    | "ADMIN"
    | "RECRUITER"
    | "VIEWER";

export interface IUser {
    id: number;
    googleId: string;
    email: string;
    name: string;
    role: UserRole;
}