import React from "react";
import {Grid} from "semantic-ui-react";
import {Exertion} from "../../../app/models/exertion";
import ExertionList from "./ExertionList";
import ExertionDetails from "../details/Exertion";
import ExertionForm from "../form/ExertionForm";

interface Props {
    exertions: Exertion[];
    selectedExertion: Exertion | undefined;
    selectExertion: (id: string) => void;
    cancelSelectExertion: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (exertion: Exertion) => void;
    deleteExertion: (id: string) => void;
}

export default function ExertionDashboard({exertions, 
       selectedExertion, selectExertion, cancelSelectExertion,
        editMode, openForm, closeForm, createOrEdit, deleteExertion}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ExertionList exertions={exertions} 
                              selectExertion={selectExertion}
                              deleteExertion={deleteExertion}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedExertion && !editMode &&
                <ExertionDetails exertion={selectedExertion} 
                                 cancelSelectExertion={cancelSelectExertion}
                                 openForm={openForm}/>}
                {editMode &&
                <ExertionForm closeForm={closeForm} exertion={selectedExertion} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}

