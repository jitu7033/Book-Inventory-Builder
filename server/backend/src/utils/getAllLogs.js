

export const getAllLogs = (req) => {
    // const ip = req.ip || req.socket.remot;
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
    const method = req.method;
    const fullPath = req.originalUrl;
    const route = req.url;
    // const routPath = req.route.path;
    const user_agent = req.headers['user-agent'];
    const origin = req.headers['origin']
        || req.headers['referer']
        || req.headers['host']   // the hostheader sent
        || 'unknown';

    // console.log(req);
    return { ip, method, route, fullPath, user_agent, origin };
}