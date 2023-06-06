import Axios from "./Axios";

let SchoolsServices = {
    allSchools: async function () {
        const response = await Axios.get(`schools`);
        return response;
    },

    getSchool: async function (schoolId) {
        const response = await Axios.get(`schools/${schoolId}`);
        return response;
    },

    createSchool: async function (obj) {
        const response = await Axios({
            method: 'post',
            url: 'schools',
            data: obj,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        });
        return response;
    },

    editSchool: async function (schoolId, obj) {
        const response = await Axios.patch(`schools/${schoolId}`, obj);
        return response;
    },

    deleteSchool: async function (schoolId) {
        const response = await Axios.delete(`schools/${schoolId}`);
        return response;
    },
};

export default SchoolsServices;