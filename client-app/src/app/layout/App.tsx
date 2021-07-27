import React, {useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {Exertion} from "../models/exertion";
import NavBar from "./NavBar";
import ExertionDashboard from '../../features/exertions/dashboard/ExertionDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from "./LoadingComponent";

function App() {
  const [exertions, setExertions] = useState<Exertion[]>([]);
  const [selectedExertion, setSelectedExertion] = useState<Exertion | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false)
  
  useEffect(() => {
    agent.Exertions.list()
        .then(response => {
          let exertions: Exertion[] = [];
          response.forEach(exertion => {
              exertion.date = exertion.date.split('T')[0];
              exertions.push(exertion);
          })
          setExertions(response);
          setLoading(false);
        })
  }, [])
  
  function handleSelectExertion(id: string){
      setSelectedExertion(exertions.find(x => x.id === id))
  }
  
  function handleCancelSelectExertion(){
      setSelectedExertion(undefined)
  }
  
  function handleFormOpen(id?: string){
      id ? handleSelectExertion(id) : handleCancelSelectExertion();
      setEditMode(true);
  }
  
  function handleFormClose(){
      setEditMode(false);
  }
  
  function handleCreateOrEditExertion(exertion: Exertion){
      
      setSubmitting(true);
      
      if(exertion.id){
          agent.Exertions.update(exertion)
              .then(() => {
                  setExertions([...exertions
                      .filter(x => x.id !== exertion.id), exertion]);
                  setSelectedExertion(exertion);
                  setEditMode(false);
                  setSubmitting(false);
              })
      } else {
          exertion.id = uuid();
          agent.Exertions.create(exertion)
              .then(() => {
                  setExertions([...exertions, exertion]);
                  setSelectedExertion(exertion);
                  setEditMode(false);
                  setSubmitting(false);
              })
      }
  }
  
  function handleDeleteExertion(id: string){
      setSubmitting(true);
      agent.Exertions.delete(id)
          .then(() => {
              setExertions([...exertions.filter(x => x.id !== id)]);  
              setSubmitting(false);
          })
  }
  
  if(loading) return <LoadingComponent content='Loading app...' />
  
  return (
    <>
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
            <ExertionDashboard 
                exertions={exertions}
                selectedExertion={selectedExertion}
                selectExertion={handleSelectExertion}
                cancelSelectExertion={handleCancelSelectExertion}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                createOrEdit={handleCreateOrEditExertion}
                deleteExertion={handleDeleteExertion}
                submitting={submitting}
            />
        </Container>
    </>
  );
}

export default App;
