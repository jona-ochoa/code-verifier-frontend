import axios from '../utils/config/axios.config';

/**
 * Login Method
 * @param { string } email Email to login a User
 * @param { string } password Password to login a User
 * @returns 
 */
export const login = (email: string, password: string) => {
    const body = {
        email,
        password
    }

    return axios.post('/auth/login', body)
}

/**
 * Register User Method
 * @param { string } email Email of user
 * @param { string } password Password of user
 * @param { string } name Name of user
 * @param { number } age Age of user
 * @returns 
 */
export const register = (email: string, password: string, name: string, age: number) => {
    const body = {
        name,
        email,
        password,
        age
    }

    return axios.post('/auth/register', body)
}
