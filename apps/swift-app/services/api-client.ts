import axios from "axios";
import { Platform } from "react-native";

/*
  Android emulator routes host loopback through 10.0.2.2 while
  iOS Simulator and web can use localhost directly.
*/
const BASE_URL = Platform.OS === "android"
  ? "http://10.0.2.2:3000/"
  : "http://localhost:3000/";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
