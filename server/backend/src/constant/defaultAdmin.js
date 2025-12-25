import dotenv from "dotenv";
dotenv.config();

export const defaultEmail = process.env.email || "admin@example.com";
export const defaultPassword = process.env.password || "test123";
