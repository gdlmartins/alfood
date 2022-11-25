import axios from 'axios';


export const httpV1 = axios.create({
    baseURL:"http://localhost:8000/api/v1/"
})


export const httpV2 = axios.create({
    baseURL:"http://localhost:8000/api/v2/"
})