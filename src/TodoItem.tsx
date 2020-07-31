import React, { useState } from 'react';
import styled from 'styled-components';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { Todo } from './types'

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0;
`;

const Checkbox = styled.input`
    transform: scale(1.5)
`;

const TodoText = styled.li`
    list-style-type: none;
    width: 50%;
    margin: 0;
    padding: 0;
`;

const Time = styled.input`
    width: 7%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const InfoButton = styled(Button)``;

const Delete = styled(Button)``;

const Slide = styled.div``;


export default function TodoItem (props: {
    addNewTodo: (text: string) => void,
    deleteTodo: (id: number) => void,
    onCheckboxChange: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    item: Todo
    index: number
}){

    const {item, index}= props;

    return (
        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => (
                <ListItem key={item.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                >
                    <Checkbox type='checkbox' checked={item.checked}
                              onChange={props.onCheckboxChange(item.id)}
                    />
                    <TodoText style={item.checked ? {textDecoration: "line-through"} : {}}> {item.data} </TodoText>
                    <Delete onClick={() => props.deleteTodo(item.id)}>X</Delete>
                    <InfoButton>?</InfoButton>
                    <Slide>|</Slide>
                </ListItem>
            )}
        </Draggable>
    )

}