import React, {useEffect} from 'react';
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from "../../features/home/HomePage";
import ExertionDashboard from "../../features/exertions/dashboard/ExertionDashboard";
import ExertionForm from "../../features/exertions/form/ExertionForm";
import ExertionDetails from "../../features/exertions/details/Exertion";
import TestErrors from '../../features/errors/TestError';
import {ToastContainer} from "react-toastify";
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import {useStore} from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../modals/ModalContainer";

function App() {
    const location = useLocation();
    const {commonStore, userStore} = useStore();
    
    useEffect(() => {
        if(commonStore.token){
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])
    
    if(!commonStore.appLoaded) return <LoadingComponent content="Loading app..."/>
    
  return (
    <>
        <ToastContainer position='bottom-right' hideProgressBar />
        <ModalContainer />
        <Route exact path='/' component={HomePage}/>
        <Route 
            path={'/(.+)'}
            render={() => (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Switch>
                            <Route exact path='/exertions' component={ExertionDashboard}/>
                            <Route path='/exertions/:id' component={ExertionDetails}/>
                            <Route key={location.key} path={['/createExertion', '/manage/:id']} component={ExertionForm}/>
                            <Route path='/errors' component={TestErrors} />
                            <Route path='/server-error' component={ServerError}/>
                            <Route path='/login' component={LoginForm}/>
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </>
            )}
        />
    </>
  )}

export default observer(App);
