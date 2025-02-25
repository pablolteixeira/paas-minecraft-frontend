import axios from 'axios';
import isTokenExpired from './tokenValidation';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v0`
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        console.log(config)

        if (config.url == '/auth/login' || config.url == '/register') {
            return config;
        }

        if (!token || isTokenExpired(token)) {
            window.location.href = '/login';
            localStorage.removeItem("token");
            return Promise.reject(new Error("Token expired"));
        }

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
)


export default api;