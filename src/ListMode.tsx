import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { Todo } from './types'
import TodoItem from "./TodoItem";

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 5%;
    padding: 0;
    width: 80vw;    
    font-size: 18px;
    font-family: 'Cousine', monospace;
    user-select: none;
`;

const List = styled.ul`
    padding: 0;
`;


const WrapperAddTodo = styled.div`
    margin-bottom: 20px;
`;

const WrapperControls = styled.div`
`;

const InputTodo = styled.input`
    width: 50%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
    margin-right: 10px;
`;

const AddTodo = styled(Button)`
  margin-right: 10px;
`;

const SingleTaskModeButton = styled(Button)``;



const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default function ListMode(props: {
    todos: Todo[],
    addNewTodo: (text: string) => void,
    deleteTodo: (id: number) => void,
    onCheckboxChange: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    setTodos: (todos: Todo[]) => void
}) {

    let history = useHistory();
    const handler = () => {
        history.replace('/single')
    };

    const [inputValue, setValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            props.addNewTodo(inputValue); setValue('')
        }
    };

    const onDragEnd = (result : any) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.todos,
            result.source.index,
            result.destination.index
        );

        props.setTodos(items);
    };

    return (
        <Wrapper>
            <WrapperAddTodo>
                <InputTodo type="text"
                           onChange={(event) => setValue(event.target.value)}
                           onKeyDown={handleKeyDown}
                           value={inputValue}
                           autoFocus
                />
                <AddTodo onClick={() => {props.addNewTodo(inputValue); setValue('')}}>Добавить</AddTodo>
                <SingleTaskModeButton onClick={handler}>Одно задание</SingleTaskModeButton>
            </WrapperAddTodo>
            <WrapperControls>

            </WrapperControls>
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="droppable">
                    {(provided, snapshot) =>(
                        <List {...provided.droppableProps}
                              ref={provided.innerRef}
                        >
                            {props.todos.map((item, index) => (
                                <TodoItem item={item}
                                          index={index}
                                          addNewTodo={props.addNewTodo}
                                          deleteTodo={props.deleteTodo}
                                          onCheckboxChange={props.onCheckboxChange}
                                />

                            ))}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </Wrapper>
    );
}
