import { db } from "../config/db.config.js";
import { defaultEmail, defaultPassword } from "../constant/defaultAdmin.js";
import { wsInstance } from "../realtime/wsInstance.js";
import { getAllLogs } from "../utils/getAllLogs.js";
import dotenv from "dotenv"
import { getLocationFromIp } from "../utils/getLocationFromIp.js";
import { normalizeIP } from "../test/normalizeIp.js";
dotenv.config();
export async function adminLogger(req, res, next) {

    // get email and password from env or default 
    const email = process.env.email || defaultEmail;
    const password = process.env.password || defaultPassword;

    // get all the logs here 
    const { ip, method, route, fullPath, user_agent, origin } = getAllLogs(req);
    const logs = getAllLogs(req);
    const address = await getLocationFromIp(normalizeIP(ip));
    if (address.status === "fail") logs.status = address;
    else logs.address = address;
    // get the response from response body but show only message no data 
    const originalSend = res.send;
    let responseMessage;
    res.send = function (body) {
        try {
            if (body && typeof body === "object") {
                responseMessage = body.message ?? JSON.stringify(body);
            } else if (typeof body === "string") {
                try {
                    const parsed = JSON.parse(body);
                    responseMessage = parsed.message ?? body;
                } catch {
                    responseMessage = body;
                }
            } else {
                responseMessage = String(body);
            }
        } catch {
            responseMessage = "[unreadable response]";
        }
        return originalSend.call(this, body);
    };
    res.on('finish', () => {

        // check admin from db
        try {
            const admin = db.prepare('select * from admins where email = ? and password = ?').get(email, password)
            if (!admin) {
                console.log("admin not found in database ");
                next();
            }
            db.prepare(`
                INSERT INTO logs 
                (admin_id, route, endpoint, method, ip, user_agent, status, response, origin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).run(
                admin.id,
                route,           // route
                fullPath,        // endpoint
                method,
                ip,
                user_agent,
                res.statusCode,
                responseMessage,
                origin
            );
            wsInstance.emit(admin.id, { logs, statusCode: res.statusCode, responseMessage })
        } catch (dbErr) {
            console.error('[AdminErrorLogger] Failed to save thrown error:', dbErr.message);
        }

    });

    next();
}


