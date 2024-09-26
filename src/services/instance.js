import axios from "axios";

const baseURL = "https://password-rest-be-zm5k.onrender.com";

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});


export { instance };
