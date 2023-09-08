import axios from './axios';


const getAll = () => {
    return axios.get("/BookImport/");
}

const create = (data) => {
    return axios.post("/BookImport", data);
}

const update = (data) => {
    return axios.put('/BookImport', data);
}

const deleteSp = (id) => {
    return axios.delete(`/BookImport/${id}`);
}


export { getAll, create, update, deleteSp }