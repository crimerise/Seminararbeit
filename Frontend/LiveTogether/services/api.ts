import axios from "axios";


const API_BASE_URL = "http://10.225.236.146:3000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// === AUTH ROUTES ===
export const registerUser = (name, email, password) => {
    return api.post("/auth/register", { name, email, password });
};

export const loginUser = (email, password) => {
    return api.post("/auth/login", { email, password });
};

export const refreshToken = (token) => {
    return api.post("/auth/refresh", { token });
};

export const logoutUser = (token) => {
    return api.post("/auth/logout", { token });
};

// === PASSWORD RESET ===
export const requestPasswordReset = (email) => {
    return api.post("/users/request-reset", { email });
};

export const resetPassword = (token, newPassword) => {
    return api.post("/users/reset", { token, newPassword });
};
