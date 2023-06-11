import axios from "axios"
import { GLOBAL } from "models/model"


const url_global = GLOBAL.urlApi

export const auth = async(credentials) =>{

    const url = url_global + "/auth/login"

    const response = await axios.post(url,credentials)

    // console.log(response.data.access_token)
    return response.data
}