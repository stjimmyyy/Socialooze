import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import ExertionList from "./ExertionList";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ExertionFilters from "./ExertionFilters";

export default observer( function ExertionDashboard(){
    const { exertionStore } = useStore();
    const {loadExertions, exertionRegistry} = exertionStore
    
    useEffect(() => {
        if (exertionRegistry.size <= 1) loadExertions()
    }, [exertionRegistry.size, loadExertions])

    if(exertionStore.loadingInitial) return <LoadingComponent content='Loading exertions...' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <ExertionList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ExertionFilters />
            </Grid.Column>
        </Grid>
    )
})

