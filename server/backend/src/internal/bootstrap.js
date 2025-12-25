
import { startAuthServer } from '../auth/authApi.js';
import { startWebSocketServer } from '../realtime/wsServer.js';

export function bootAnalytics() {
    startAuthServer(4701);
    startWebSocketServer(4700);
}
