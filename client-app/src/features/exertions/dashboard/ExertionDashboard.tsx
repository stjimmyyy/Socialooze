import React from "react";
import {Grid} from "semantic-ui-react";
import ExertionList from "./ExertionList";
import ExertionDetails from "../details/Exertion";
import ExertionForm from "../form/ExertionForm";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

export default observer( function ExertionDashboard(){
    
    const { exertionStore } = useStore();
    const {selectedExertion, editMode} = exertionStore;
    
    return(
        <Grid>
            <Grid.Column width='10'>
                <ExertionList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedExertion && !editMode &&
                <ExertionDetails />}
                  
                {editMode &&
                <ExertionForm/>}
            </Grid.Column>
        </Grid>
    )
})

