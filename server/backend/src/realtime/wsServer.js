
import net from 'net';
import { WebSocketServer } from 'ws';
import { verifyAdmin } from '../auth/jwt.js';

const adminSockets = new Map();
let wss = null;

export function startWebSocketServer(port = 4700) {
    if (wss) return wss; // already running in this process


    // create TCP connection. 
    const tcpServer = net.createServer();

    tcpServer.once('error', () => {
        // Port already bound by another analytics agent
        console.log('[Analytics WS] Already running');
    });

    tcpServer.once('listening', () => {
        tcpServer.close(() => {
            wss = new WebSocketServer({ port });
            console.log(`[Analytics WS] Started on ${port}`);
            attachHandlers();
        });
    });

    tcpServer.listen(port, '0.0.0.0');

    return {
        emit(adminId, log) {
            const sockets = adminSockets.get(adminId);
            if (!sockets) return;

            const data = JSON.stringify(log);

            sockets.forEach(ws => {
                try {
                    if (ws.readyState === ws.OPEN) ws.send(data);
                } catch { }
            });
        }
    };
}


// it is admin verification 
function attachHandlers() {
    wss.on('connection', (ws, req) => {
        try {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const token = url.searchParams.get('token');
            if (!token) return ws.close();

            const { adminId } = verifyAdmin(token);

            if (!adminSockets.has(adminId)) adminSockets.set(adminId, new Set());
            adminSockets.get(adminId).add(ws);

            ws.on('close', () => adminSockets.get(adminId)?.delete(ws));
            ws.on('error', () => { });
        } catch {
            ws.close();
        }
    });
}