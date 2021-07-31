import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import MyTextInput from "../../app/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useStore } from "../../app/stores/store";

export default observer (function LoginForm(){
    const {userStore} = useStore();
    
    return(
        <Formik initialValues={{email: '', password: '', error: null}} onSubmit={(values, {setErrors}) => userStore
            .login(values)
            .catch(error => setErrors({error: 'Invalid email or password'}))}>
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className = 'ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Socialooze' color='teal' textAlign='center'/>
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type='password'/>
                    <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>} />
                    <Button positive content='Login' type='submit' fluid  loading={isSubmitting}/>
                </Form>
            )}
        </Formik>
    )
})