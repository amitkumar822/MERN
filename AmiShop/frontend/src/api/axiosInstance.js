import axios from "axios";

export const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default API;
