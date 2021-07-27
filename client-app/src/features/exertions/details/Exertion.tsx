import React from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {Exertion} from "../../../app/models/exertion";

interface Props {
    exertion: Exertion;
    cancelSelectExertion: () => void;
    openForm: (id: string) => void;
}

export default function ExertionDetails({exertion, cancelSelectExertion, openForm}: Props) {
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
                    <Button onClick={cancelSelectExertion} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}