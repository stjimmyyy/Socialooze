import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import ExertionDetailedHeader from "./ExertionDetailedHeader";
import ExertionDetailedChat from "./ExertionDetailedChat";
import ExertionDetailedSidebar from "./ExertionDetailedSidebar";
import ExertionDetailedInfo from "./ExertionDetailedInfo";


export default observer( function ExertionDetails() {
    const { exertionStore } = useStore();
    const { selectedExertion: exertion, loadExertion, loadingInitial } = exertionStore
    const { id } = useParams<{id: string}>();
    
    useEffect(() => {
        if (id) loadExertion(id);
    }, [id, loadExertion])
    
    if(loadingInitial || !exertion) return <LoadingComponent />;
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ExertionDetailedHeader exertion={exertion}/>
                <ExertionDetailedInfo exertion={exertion}/>
                <ExertionDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ExertionDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})