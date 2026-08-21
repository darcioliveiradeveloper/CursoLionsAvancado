export type UserRole = "admin" | "user";

export interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
}

export interface IAdminUser extends IUser {
  role: UserRole;
}

// ========== EXERCÍCIO 6.1: CONSUMO DE API ==========

export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

export interface ICountry {
  name: string;
  region: string;
  capital?: string;
  population: number;
  flag: string;
}
