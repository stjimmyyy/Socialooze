import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container} from "semantic-ui-react";
import {Exertion} from "../models/exertion";
import NavBar from "./NavBar";
import ExertionDashboard from '../../features/exertions/dashboard/ExertionDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [exertions, setExertions] = useState<Exertion[]>([]);
  const [selectedExertion, setSelectedExertion] = useState<Exertion | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/exertions')
        .then(response => {
          console.log(response);
          setExertions(response.data);
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
      exertion.id ? setExertions([...exertions
          .filter(x => x.id !== exertion.id), exertion])
          : setExertions([...exertions, {...exertion, id: uuid()}]);
      
      setEditMode(false);
      setSelectedExertion(exertion);
  }
  
  function handleDeleteExertion(id: string){
      setExertions([...exertions.filter(x => x.id !== id)]);
  }
  
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
            />
        </Container>
    </>
  );
}

export default App;
