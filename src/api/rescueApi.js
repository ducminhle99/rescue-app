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
    getUserDetail: (id) => {
        const url = "/users/" + id;
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

    // statistic
    getStatistic: (id) => {
        const url = "/repairShop/statistic/" + id;
        return axiosClient.get(url);
    },

    // ratings
    getRatings: (id) => {
        const url = "/users/ratings/" + id;
        return axiosClient.get(url);
    },
    createRating: (data) => {
        const url = "/users/ratings";
        return axiosClient.post(url, data);
    },

    // service

    fetchService: (id) => {
        const url = "/services/" + id;
        return axiosClient.get(url);
    },
    // rescue
    fetchRescue: () => {
        const url = '/rescue'
        return axiosClient.get(url);
    },
    createRescue: (data) => {
        const url = '/rescue'
        return axiosClient.post(url, data);
    },
    createListRescue: (data) => {
        const url = '/rescue/list'
        return axiosClient.post(url, data);
    },

    //appointnent
    createAppointment: (data) => {
        const url = '/users/appointments';
        return axiosClient.post(url, data);
    },
    fetchAppointment: () => {
        const url = '/users/appointments';
        return axiosClient.get(url);
    },

    // noti
    fetchNoti: () => {
        const url = '/users/notifications';
        return axiosClient.get(url);
    }


}