import axios from './axios';


const getAll = () => {
    return axios.get("/Book/");
}

const create = (data) => {
    return axios.post("/Book", data);
}

const update = (data) => {
    return axios.put('/Book', data);
}

const deleteSp = (id) => {
    return axios.delete(`/Book/${id}`);
}


export { getAll, create, update, deleteSp }