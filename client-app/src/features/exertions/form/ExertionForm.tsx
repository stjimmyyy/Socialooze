import React, {ChangeEvent, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {Exertion} from "../../../app/models/exertion";

interface Props {
    exertion: Exertion | undefined;
    closeForm: () => void;
    createOrEdit: (exertion: Exertion) => void;
    submitting: boolean
}

export default function ExertionForm({exertion: selectedExertion, closeForm, createOrEdit, submitting}: Props){
    
    const initialState = selectedExertion ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    
    const [exertion, setExertion] = useState(initialState);
    
    function handleSubmit() {
        createOrEdit(exertion);
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setExertion({...exertion, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={exertion.title} 
                            name='title'
                            onChange={handleInputChange}/>
                
                <Form.TextArea placeholder='Description' value={exertion.description}
                               name='description'
                               onChange={handleInputChange}/>
                
                <Form.Input placeholder='Category' value={exertion.category}
                            name='category'
                            onChange={handleInputChange}/>
                
                <Form.Input placeholder='Date' value={exertion.date}
                            type='date'
                            name='date'
                            onChange={handleInputChange}/>
                
                <Form.Input placeholder='City' value={exertion.city}
                            name='city'
                            onChange={handleInputChange}/>
                
                <Form.Input placeholder='Venue' value={exertion.venue}
                            name='venue'
                            onChange={handleInputChange}/>
                
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}