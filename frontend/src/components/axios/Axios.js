import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8300/'
});

export default axiosInstance;