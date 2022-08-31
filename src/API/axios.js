import axios from "axios";

const API = axios.create({
  baseURL: "http://www.omdbapi.com/?apikey=a1cb020&",
});

export default API;
