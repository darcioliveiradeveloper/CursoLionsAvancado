export type UserRole = "admin" | "user";

export interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}
