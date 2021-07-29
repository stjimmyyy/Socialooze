import React from 'react';
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

function App() {
    const location = useLocation();
  return (
    <>
        <ToastContainer position='bottom-right' hideProgressBar/>
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
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </>
            )}
        />
    </>
  )}

export default observer(App);
