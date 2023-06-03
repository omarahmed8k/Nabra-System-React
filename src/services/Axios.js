import axios from "axios";
import endPoint from "./endPoint";

const baseURL = endPoint.endPoint;
const Axios = axios.create({ baseURL });

Axios.defaults.baseURL = baseURL;

Axios.interceptors.request.use(async (req) => {
    return req;
});

export default Axios;