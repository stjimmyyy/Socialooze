import React, {SyntheticEvent} from "react";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function ExertionList(){

    const { exertionStore } = useStore();
    const [target, setTarget] = useState('');
    const {deleteExertion, exertionsByDate, loading} = exertionStore;

    function handleExertionDelete(e: SyntheticEvent<HTMLButtonElement>, id:string) {
        setTarget(e.currentTarget.name);
        deleteExertion(id);
    }
    
    return(
        <Segment>
            <Item.Group divided>
                {exertionsByDate.map(exertion => (
                    <Item key={exertion.id}>
                        <Item.Content>
                            <Item.Header as='a'>{exertion.title}</Item.Header>
                            <Item.Meta>{exertion.date}</Item.Meta>
                            <Item.Description>
                                <div>{exertion.description}</div>
                                <div>{exertion.city}, {exertion.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => exertionStore.selectExertion(exertion.id)} 
                                        floated='right' content='View' color='blue'/>

                                <Button onClick={(e) => 
                                    handleExertionDelete(e, exertion.id)}
                                    
                                        name={exertion.id}
                                        floated='right' 
                                        content='Delete' 
                                        color='red'
                                        loading={loading && target === exertion.id}        
                                />
                                <Label basic content={exertion.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})