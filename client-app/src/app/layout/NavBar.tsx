import React from "react";
import {Button, Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";


export default function NavBar(){
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}/>
                    Socialooze
                </Menu.Item>
                <Menu.Item as={NavLink} to='/exertions' name ='Exertions'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createExertion' positive content='Create Exertion' />
                </Menu.Item>
            </Container>
        </Menu>
    )
    
}