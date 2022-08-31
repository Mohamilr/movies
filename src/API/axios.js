import axios from "axios";

const API = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&`,
});

export default API;
