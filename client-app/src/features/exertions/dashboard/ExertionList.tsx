import React, {SyntheticEvent} from "react";
import {Exertion} from "../../../app/models/exertion";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import { useState } from "react";

interface Props {
    exertions: Exertion[];
    selectExertion: (id: string) => void;
    deleteExertion: (id: string) => void;
    submitting: boolean;
}

export default function ExertionList({exertions, selectExertion, deleteExertion, submitting}: Props){
    
    const [target, setTarget] = useState('');
    
    function handleExertionDelete(e: SyntheticEvent<HTMLButtonElement>, id:string) {
        setTarget(e.currentTarget.name);
        deleteExertion(id);
    }
    
    return(
        <Segment>
            <Item.Group divided>
                {exertions.map(exertion => (
                    <Item key={exertion.id}>
                        <Item.Content>
                            <Item.Header as='a'>{exertion.title}</Item.Header>
                            <Item.Meta>{exertion.date}</Item.Meta>
                            <Item.Description>
                                <div>{exertion.description}</div>
                                <div>{exertion.city}, {exertion.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => {selectExertion(exertion.id)}} 
                                        floated='right' content='View' color='blue'/>

                                <Button onClick={(e) => 
                                    handleExertionDelete(e, exertion.id)}
                                    
                                        name={exertion.id}
                                        floated='right' 
                                        content='Delete' 
                                        color='red'
                                        loading={submitting && target === exertion.id}        
                                />
                                <Label basic content={exertion.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}