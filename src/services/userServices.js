import Axios from "./Axios";

let userServices = {
    getUser: async function (userId) {
        const response = await Axios.get(`user/${userId}`);
        return response;
    },
};

export default userServices;