
import { db } from '../config/db.config.js';
import { defaultEmail, defaultPassword } from '../constant/defaultAdmin.js';
import { wsInstance } from '../realtime/wsInstance.js';
import { getAllLogs } from '../utils/getAllLogs.js';

export function adminErrorLogger(err, req, res, next) {

    const { ip, method, route, fullPath, user_agent, origin } = getAllLogs(req);
    const logs = getAllLogs(req);
    const email = defaultEmail;
    const password = defaultPassword;

    const admin = db.prepare(
        'SELECT id FROM admins WHERE email = ? AND password = ?'
    ).get(email, password);

    if (admin) {
        try {
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
                err.status || 500,
                JSON.stringify({ message: err.message }),
                origin
            );
            wsInstance.emit(admin.id, { logs, message: err.message, statuscode: err.status })
        } catch (dbErr) {
            console.error('[AdminErrorLogger] Failed to save thrown error:', dbErr.message);
        }
    }
    next(err);
}
