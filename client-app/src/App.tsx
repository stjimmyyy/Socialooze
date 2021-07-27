import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {Header, List} from "semantic-ui-react";

function App() {
  const [exertions, setExertions] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/exertions')
        .then(response => {
          console.log(response);
          setExertions(response.data);
        })
  }, [])
  
  return (
    <div>
        <Header as='h2' icon='users' content='Socialooze'/>
        <List>
          {exertions.map((exertion: any) => (
              <List.Item key={exertion.id}>
                {exertion.title}
              </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
