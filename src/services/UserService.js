import axios from './axios';
const fetchAllUser = (page, sortBy, search) => {
    return axios.get(`/User?page=${page}&sortBy=${sortBy}&search=${search}`);
}
const createUser = (email, password, fistName, lastName) => {
    return axios.post('/User/', { email, password, fistName, lastName });
}
const updateUser = (id, email, password, fistName, lastName) => {
    return axios.put('/User/', { id, email, password, fistName, lastName });
}
const deleteUser = (id) => {
    return axios.delete(`/User/${id}`);
}
const LoginUser = (email, password) => {

    return axios.post("/login", {
        email: email,
        password: password
    });


}
const LogoutUser = () => {

    return axios.post("/logout");


}
export { fetchAllUser, createUser, updateUser, deleteUser, LoginUser, LogoutUser }