import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://online-survey-server.onrender.com",
});

export default api;
