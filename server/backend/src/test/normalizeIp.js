export function normalizeIP(ip) {
    if (!ip) return null;
    if (ip.startsWith("::ffff:")) return ip.replace("::ffff:", "");
    if (ip === "::1") return "127.0.0.1";
    return ip;
}