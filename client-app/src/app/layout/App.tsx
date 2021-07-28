import React, { useEffect } from 'react';
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ExertionDashboard from '../../features/exertions/dashboard/ExertionDashboard';
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
    
  const {exertionStore} = useStore();    
  
  
  useEffect(() => {
      exertionStore.loadExertions()
  }, [exertionStore])
    
  if(exertionStore.loadingInitial) return <LoadingComponent content='Loading app...' />
  
  return (
    <>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
            <ExertionDashboard/>
        </Container>
    </>
  );
}

export default observer(App);
