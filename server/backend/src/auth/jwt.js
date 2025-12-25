import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();

export function signAdmin(adminId) {
    return jwt.sign(
        { adminId },
        process.env.ANALYTICS_JWT_SECRET || "jitu",
        { expiresIn: '12h' }
    );
}
export function verifyAdmin(token) {
    return jwt.verify(token, process.env.ANALYTICS_JWT_SECRET || "jitu");
}
