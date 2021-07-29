import React, {useEffect, useState} from "react";
import {Button, Header, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useHistory, useParams} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/form/MyTextInput";
import MyTextArea from "./MyTextArea";
import MySelectInput from "./MySelectInput";
import {categoryOptions} from "../options/options";
import MyDateInput from "./MyDateInput";
import { Exertion } from "../../../app/models/exertion";
import { v4 as uuid } from 'uuid';


export default observer(function ExertionForm(){
    const history = useHistory();
    const { exertionStore } = useStore();
    const { createExertion, updateExertion, loading, loadExertion, loadingInitial } = exertionStore;
    const { id } = useParams<{id: string}>();

    const [exertion, setExertion] = useState<Exertion>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The exertion title is required!'),
        description: Yup.string().required('The exertion description is required!'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required!').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })
    
    useEffect(() => {
        if (id) loadExertion(id)
            .then(exertion => setExertion(exertion!))
    }, [id, loadExertion])
    
    function handleFormSubmit(exertion: Exertion) {
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


    if(loadingInitial) return <LoadingComponent content='Loading exertion...' />
    
    return (
        <Segment clearing>
            <Header content='Exertion details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={exertion} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder= 'Title' name='title'/>
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput 
                            placeholderText='Date' 
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal'/>
                        <MyTextInput placeholder='City' name='city'/>
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button 
                                disabled={isSubmitting || !dirty || !isValid} 
                                loading={loading} 
                                floated='right' 
                                positive type='submit' 
                                content='Submit'/>
                        <Button as={Link} to='/exertions' floated='right' type='button' content='Cancel'/>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})