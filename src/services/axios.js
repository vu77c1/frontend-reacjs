import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api',
    //headers: { 'Content-Type': 'application/json-patch+json' }
});
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    let rs = {}
    if (error.response) {
        rs.data = error.response.data;
        rs.status = error.response.status;
        rs.headers = error.response.headers;
    } else if (error.request) {
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    return rs;
});
export default instance;