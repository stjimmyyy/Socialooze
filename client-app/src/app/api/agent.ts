import axios, {AxiosResponse} from "axios";
import {Exertion} from "../models/exertion";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url)
        .then(responseBody),

    post: <T> (url: string, body: {}) => axios.post<T>(url, body)
        .then(responseBody),

    put: <T> (url: string, body: {}) => axios.put<T>(url, body)
        .then(responseBody),
    
    del: <T>(url: string) => axios.delete<T>(url)
        .then(responseBody)
}

const Exertions = {
    list: () => requests.get<Exertion[]>('/exertions'),
    details: (id: string) => requests.get<Exertion>(`/exertions/${id}`),
    create: (exertion: Exertion) => axios.post('/exertions', exertion),
    update: (exertion: Exertion) => axios.put(`/exertions/${exertion.id}`, exertion),
    delete: (id: string) => axios.delete(`/exertions/${id}`)
}

const agent = {
    Exertions
}

export default agent;