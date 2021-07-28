import React from 'react';
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from 'react-router-dom';
import HomePage from "../../features/home/HomePage";
import ExertionDashboard from "../../features/exertions/dashboard/ExertionDashboard";
import ExertionForm from "../../features/exertions/form/ExertionForm";
import ExertionDetails from "../../features/exertions/details/Exertion";

function App() {
    const location = useLocation();
  return (
    <>
        <Route exact path='/' component={HomePage}/>
        <Route 
            path={'/(.+)'}
            render={() => (
                <>
                    <NavBar/>
                    <Container style={{marginTop: '7em'}}>
                        <Route exact path='/exertions' component={ExertionDashboard}/>
                        <Route path='/exertions/:id' component={ExertionDetails}/>
                        <Route key={location.key} path={['/createExertion', '/manage/:id']} component={ExertionForm}/>
                    </Container>
                </>
            )}
        />
    </>
  );
}

export default observer(App);
