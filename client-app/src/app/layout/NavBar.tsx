import React from "react";
import {Button, Container, Menu} from "semantic-ui-react";
import {useStore} from "../stores/store";


export default function NavBar(){
    
    const { exertionStore } = useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}/>
                    Socialooze
                </Menu.Item>
                <Menu.Item name ='Exertions'/>
                <Menu.Item>
                    <Button onClick={() => exertionStore.openForm()} positive content='Create Exertion' />
                </Menu.Item>
            </Container>
        </Menu>
    )
    
}