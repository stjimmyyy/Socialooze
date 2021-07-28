import React, {useEffect} from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Link, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

export default observer( function ExertionDetails() {
    const { exertionStore } = useStore();
    const { selectedExertion: exertion, loadExertion, loadingInitial } = exertionStore
    const { id } = useParams<{id: string}>();
    
    useEffect(() => {
        if (id) loadExertion(id);
    }, [id, loadExertion])
    
    if(loadingInitial || !exertion) return <LoadingComponent />;
    
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
                    <Button as={Link} to={`/manage/${exertion.id}`} basic color='blue' content='Edit'/>
                    <Button as={Link} to='/exertions' basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})