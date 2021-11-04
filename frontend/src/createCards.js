import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2 ease;
    flex-grow:1;
    min-height:100px;
`;
export default class CreateCards extends React.Component {
    render() {
        return (
            <Container>
                <Title></Title>
                <Droppable >
                    {(provided, snapshot) => (
                        <TaskList>
                            
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}
