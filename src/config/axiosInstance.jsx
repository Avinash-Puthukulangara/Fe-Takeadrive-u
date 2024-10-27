import axios from "axios";
import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: "be-takeadrive-production.up.railway.app/api",
    withCredentials: true
})
