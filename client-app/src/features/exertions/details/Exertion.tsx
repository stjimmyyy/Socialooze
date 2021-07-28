import React from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default function ExertionDetails() {
    
    const { exertionStore } = useStore();
    const {selectedExertion: exertion, openForm, cancelSelectedExertion } = exertionStore
    
    if(!exertion) return <LoadingComponent />;
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${exertion.category}.jpg`}/>
            <Card.Content>
                <Card.Header>{exertion.title}</Card.Header>
                <Card.Meta>
                    <span>{exertion.date}</span>
                </Card.Meta>
                <Card.Description>
                    {exertion.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(exertion.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedExertion} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}