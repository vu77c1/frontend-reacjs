import axios from './axios';


const getAll = () => {
    return axios.get("/Category/");
}

const create = (data) => {
    return axios.post("/Category", data);
}

const update = (data) => {
    return axios.put('/Category', data);
}

const deleteSp = (id) => {
    return axios.delete(`/Category/${id}`);
}


export { getAll, create, update, deleteSp }