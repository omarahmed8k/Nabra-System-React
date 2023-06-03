import Axios from "./Axios";

let authServices = {
    login: async function (obj) {
        const response = await Axios.post(`login`, obj);
        return response;
    },

    register: async function (obj) {
        const response = await Axios.post(`register`, obj);
        return response;
    },
};

export default authServices;