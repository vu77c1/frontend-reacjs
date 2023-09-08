import axios from './axios';


const getAll = () => {
    return axios.get("/Supplier/");
}

const create = (data) => {
    return axios.post("/Supplier", data);
}

const update = (data) => {
    return axios.put('/Supplier', data);
}

const deleteSp = (id) => {
    return axios.delete(`/Supplier/${id}`);
}


export { getAll, create, update, deleteSp }