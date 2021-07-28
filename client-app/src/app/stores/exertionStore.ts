import {makeAutoObservable, runInAction} from "mobx";
import {Exertion} from "../models/exertion";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

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
        try {
            const exertions = await agent.Exertions.list();

            exertions.forEach(exertion => {
                exertion.date = exertion.date.split('T')[0];
                this.exertionRegistry.set(exertion.id, exertion)
            })
            
            this.setLoadingInitial(false);
                 
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    selectExertion = (id: string) => {
        this.selectedExertion = this.exertionRegistry.get(id);
    }
    
    cancelSelectedExertion = () => {
        this.selectedExertion = undefined;
    }
    
    openForm = (id?: string) => {
        id ? this.selectExertion(id) : this.cancelSelectedExertion();
        this.editMode = true;
    }
    
    closeForm = () => {
        this.editMode = false;
    }
    
    createExertion = async (exertion: Exertion) => {
        this.loading = true;
        exertion.id = uuid();
        
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
                if(this.selectedExertion?.id === id) this.cancelSelectedExertion();
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}