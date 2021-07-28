import React from "react";
import {Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ExertionListItem from "./ExertionListItem";
import { Fragment } from "react";


export default observer (function ExertionList(){

    const { exertionStore } = useStore();
    const { groupedExertions } = exertionStore;
    
    return(
        
        <>
            {groupedExertions.map(([group, exertions]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {exertions.map(exertion => (
                                <ExertionListItem key={exertion.id} exertion={exertion} />

                            ))}
                </Fragment>
            ))}
        </>

    )
})