import { AxiosRequestConfig } from 'axios';
import axios from '../utils/config/axios.config';

export const getAllKatas = (token: string, limit?: number, page?: number) => {

    const options: AxiosRequestConfig = {
        headers: {
            "x-access-token": token
        },
        params: {
            limit: limit,
            page: page
        }
    }

    return axios.get('/katas', options)

}

export const getKatasById = (token: string, id: string | undefined) => {
    const options: AxiosRequestConfig = {
        headers: {
            "x-access-token": token
        },
        params: {
            id
        }
    }

    return axios.get(`/katas`, options)
}
