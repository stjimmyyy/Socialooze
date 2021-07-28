import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useHistory, useParams} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';

export default observer(function ExertionForm(){
    const history = useHistory();
    const { exertionStore } = useStore();
    const { createExertion, updateExertion, loading, loadExertion, loadingInitial } = exertionStore;
    const { id } = useParams<{id: string}>();

    const [exertion, setExertion] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {
        if (id) loadExertion(id)
            .then(exertion => setExertion(exertion!))
    }, [id, loadExertion])
    
    function handleSubmit() {
        if(exertion.id.length === 0){
            let newExertion = {
                ...exertion,
                id: uuid()
            };
            createExertion(newExertion)
                .then(() => history.push(`/exertions/${newExertion.id}`));
        } else {
            updateExertion(exertion)
                .then(() => history.push(`/exertions/${exertion.id}`));
        }
    }
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setExertion({...exertion, [name]: value})
    }
    
    if(loadingInitial) return <LoadingComponent content='Loading exertion...' />
    
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
                
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/exertions' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})