import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  // baseURL: "https://amishop-api.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
