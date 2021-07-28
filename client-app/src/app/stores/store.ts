import ExertionStore from "./exertionStore";
import {createContext, useContext} from "react";

interface Store {
    exertionStore: ExertionStore
}

export const store: Store = {
    exertionStore: new ExertionStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}