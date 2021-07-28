import {makeAutoObservable, runInAction} from "mobx";
import {Exertion} from "../models/exertion";
import agent from "../api/agent";

export default  class ExertionStore {
    exertionRegistry = new Map<string, Exertion>();
    selectedExertion: Exertion | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get exertionsByDate() {
        return Array.from(this.exertionRegistry.values())
            .sort((a, b) => 
                Date.parse(a.date) - Date.parse(b.date))
    }
    
    loadExertions = async () => {
        this.loadingInitial = true;
        try {
            const exertions = await agent.Exertions.list();

            exertions.forEach(exertion => {
                this.setExertion(exertion);
            })
            
            this.setLoadingInitial(false);
                 
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadExertion = async (id: string) => {
        let exertion = this.getExertion(id);
        if(exertion){
            this.selectedExertion = exertion;
            return exertion;
        } else {
            this.loadingInitial = true;
            try {
                exertion = await agent.Exertions.details(id);
                this.setExertion(exertion);
                runInAction(() => {
                    this.selectedExertion = exertion;
                    this.setLoadingInitial(false);            
                })
                return exertion;
            } catch (error){
                console.log(error);
                this.setLoadingInitial(false)
            }
        }
    }
    
    private setExertion = (exertion: Exertion) => {
        exertion.date = exertion.date.split('T')[0];
        this.exertionRegistry.set(exertion.id, exertion);
    }
    
    private getExertion = (id: string) => {
        return this.exertionRegistry.get(id);
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    createExertion = async (exertion: Exertion) => {
        this.loading = true;
        try{
            await agent.Exertions.create(exertion);
            runInAction(() => {
                this.exertionRegistry.set(exertion.id, exertion);
                this.selectedExertion = exertion;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    updateExertion = async (exertion: Exertion) => {
        this.loading = true;
        
        try {
            await agent.Exertions.update(exertion);
            runInAction(() => {
                this.exertionRegistry.set(exertion.id, exertion)
                this.selectedExertion = exertion;
                this.editMode = false;
                this.loading = false;
            })
            
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    deleteExertion = async (id: string) => {
        this.loading = true;
        try {
            await agent.Exertions.delete(id);
            runInAction(() => {
                this.exertionRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}