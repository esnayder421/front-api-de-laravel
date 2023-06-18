import axios from "axios";
import { GLOBAL } from "@/models/model"


const url_global = GLOBAL.ruteMorty



export const getCharacters = async (count) =>{
    const url = url_global + count
    const response = await axios.get(url)
    return response.data.results
}

export const getByIdCharacters= async (id) =>{
    if (id === undefined){

    }else{
        const url = "https://rickandmortyapi.com/api/character/" + id
        const response = await axios.get(url)
        // console.log(response.data)
        return response.data
    }
}



