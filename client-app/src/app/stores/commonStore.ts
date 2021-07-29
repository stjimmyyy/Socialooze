import {makeObservable} from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;
    
    constructor() {
        makeObservable(this)
    }
    
    
    setServerError = (error: ServerError) => {
        this.error = error;
    }
}