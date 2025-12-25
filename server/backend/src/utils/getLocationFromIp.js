export const getLocationFromIp = async (ip) => {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();

        console.log(data);

        if (data.status !== "success") return {
            status: data.status,
            message: data.message,
        };

        return {
            country: data.country,
            state: data.regionName,
            city: data.city,
            lat: data.lat,
            lon: data.lon,
            isp: data.isp,
            timezone: data.timezone
        }
    }
    catch (err) {
        return null;
    }
}