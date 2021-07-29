import ExertionStore from "./exertionStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";

interface Store {
    exertionStore: ExertionStore;
    commonStore: CommonStore;
}

export const store: Store = {
    exertionStore: new ExertionStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}