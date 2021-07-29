import React from "react";
import {Button, Icon, Item, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Exertion} from "../../../app/models/exertion";
import { format } from 'date-fns';

interface Props {
    exertion: Exertion
}

export default function ExertionListItem({exertion}: Props){

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png'/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/exertions/${exertion.id}`}>
                                {exertion.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(exertion.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker'/> {exertion.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{exertion.description}</span>
                <Button 
                    as={Link}
                    to={`/exertions/${exertion.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}