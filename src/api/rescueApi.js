import axiosClient from "./axiosClient";

export const rescueApi = {
    //auth
    register: (user) => {
        const url = "/auth/register";
        return axiosClient.post(url, user)
    },

    login: (user) => {
        const url = "/auth/login";
        return axiosClient.post(url, user)
    },

    // user 
    getUserDetail: () => {
        const url = "/users";
        return axiosClient.get(url);
    },
    getCurrentUser: () => {
        const url = "/users/current"
        return axiosClient.get(url);
    },

    updateUser: (user) => {
        const url = "/users";
        return axiosClient.put(url, user)
    },

    // files

    //...........................................................

    //..............................................

    // categories
    fetchCategories: () => {
        const url = "/categories";
        return axiosClient.get(url);
    },


    //repairShop

    fetchShop: () => {
        const url = "/repairShop";
        return axiosClient.get(url);
    },
    getShopDetail: (id) => {
        const url = "/repairShop/" + id;
        return axiosClient.get(url)
    },

    // service

    fetchService: (id) => {
        const url = "/services/" + id;
        return axiosClient.get(url);
    }

}