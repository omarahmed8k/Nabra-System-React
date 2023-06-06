let data = {
    handleDataChange: (data = {}, apiData = {}) => {
        let result = {};
        for (let key in data) {
            if (typeof data[key] === 'object') {
                result[key] = data[key]
            } else {
                if (data[key] !== apiData[key]) {
                    result[key] = data[key];
                }
            }
        }
        return Object.keys(result).length ? true : false;
    }
}

export default data.handleDataChange