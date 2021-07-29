import axios, {AxiosError, AxiosResponse} from "axios";
import {Exertion} from "../models/exertion";
import {toast} from "react-toastify";
import {history} from "../../index";
import {store} from "../stores/store";

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
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string'){
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('not-found');
            }
            if (data.errors){
                const modelStateErrors = [];
                for (const key in data.errors){
                    if(data.errors.hasOwnProperty(key)){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } 
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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