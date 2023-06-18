import axios from 'axios';
import { GLOBAL } from "@/models/model"

export const Register = async (data) => {
    const url_global = GLOBAL.urlApi
    const url = url_global + "/users";

    const response = await axios.post(url, data);

    return response
}


export const GetProfile = async (token) => {
    const url_global = GLOBAL.urlApi
    const url = url_global + "/auth/me"

    const response = await axios.post(url, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data
}


export const UpdateProfile = async (token, data, id) => {
    const url_global = GLOBAL.urlApi
    const url = url_global + "/users/" + id

    const response = await axios.put(url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    console.log(response)
    // return response.data
}






