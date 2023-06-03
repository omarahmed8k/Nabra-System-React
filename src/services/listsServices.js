import Axios from "./Axios";

let ListsServices = {
    allList: async function (userId) {
        const response = await Axios.get(`lists?user=${userId}`);
        return response;
    },

    getList: async function (listId) {
        const response = await Axios.get(`lists/${listId}`);
        return response;
    },

    createList: async function (obj) {
        const response = await Axios.post(`lists`, obj);
        return response;
    },

    editList: async function (listId, obj) {
        const response = await Axios.patch(`lists/${listId}`, obj);
        return response;
    },

    deleteList: async function (listId) {
        const response = await Axios.delete(`lists/${listId}`);
        return response;
    },
};

export default ListsServices;