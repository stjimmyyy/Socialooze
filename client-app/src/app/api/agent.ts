import axios, {AxiosError, AxiosResponse} from "axios";
import {Exertion} from "../models/exertion";
import {toast} from "react-toastify";
import {history} from "../../index";
import {store} from "../stores/store";
import {User, UserFormValues} from "../models/user";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {await sleep(1000);
    return response;}, (error: AxiosError) => {
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

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Exertions,
    Account,
}

export default agent;