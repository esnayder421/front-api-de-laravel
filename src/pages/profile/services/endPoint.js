import axios from 'axios';
import { GLOBAL } from "models/model"


const url_global = GLOBAL.urlApi

export const register = async (data) => {
    const url = url_global + "/users";

    const response = await axios.post(url, data);

    return response

}


export const getProfile = async (token) => {
    const url = url_global + "/auth/me"

    const response = await axios.post(url, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}


export const updateProfile = async (token, data, id) => {
    const url = url_global + "/users/" + id

    const response = await axios.put(url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(response)
    // return response.data
}





