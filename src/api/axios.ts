import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "https://coroaafroapi-production.up.railway.app/",
    withCredentials: true,
    timeout: 30000,
});

export default api;
