import axios from "axios";
import queryString from "querystring";
import { BASE_URL } from '../constant/const';
import { getLocalAccessToken } from "../redux/localStorage";
const axiosClient = axios.create({
    baseURL: BASE_URL,
    header: {
        'content-type': 'application/json',
    },
    paramsSerializer: param => queryString.stringify(param),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = await getLocalAccessToken();
    // console.log(token)
    if (token) {
        config.headers["x-access-token"] = token.authToken;
    }

    return config;
},
    (error) => {
        throw error
    }
);

axiosClient.interceptors.response.use((respose) => {
    if (respose.data && respose) {
        return respose.data;
    }
    return respose;
}, (error) => {
    throw error;
});

export default axiosClient;