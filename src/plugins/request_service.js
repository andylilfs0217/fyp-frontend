import axios from "axios";

export const service = axios.create({
  baseURL: "http://localhost:3000", //process.env.VUE_APP_BACKEND,
  timeout: 30000
});
