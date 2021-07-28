import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import ExertionList from "./ExertionList";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer( function ExertionDashboard(){
    const { exertionStore } = useStore();
    const {loadExertions, exertionRegistry} = exertionStore
    
    useEffect(() => {
        if (exertionRegistry.size <= 1) loadExertions()
    }, [exertionRegistry.size, loadExertions])

    if(exertionStore.loadingInitial) return <LoadingComponent content='Loading app...' />
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <ExertionList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Exertion filters</h2>
            </Grid.Column>
        </Grid>
    )
})

