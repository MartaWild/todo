import React, { useState } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { Todo } from '../types';
import Stopwatch from "./Stopwatch";
import { prefix } from "../prefix";
import { connect } from "react-redux";
import {addTodo, deleteTodo, loadTodos, setTodos} from "../redux/actions";

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    height: 40px;
    cursor:pointer;
    border: none;
    padding: 5px 20px 5px 20px;
`;

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 5%;
    padding: 0;
    width: 50vw;   
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #07635C;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WrapperTodo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 35px;
    min-height: 250px;
`;

const TodoText = styled.li`
    list-style-type: none;
    margin-right: 10px;
    width: 80%;
    text-align: center;
    font-size: 25px;
`;

const WrapperButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;
`;

const CompleteButton = styled(Button)`
    `;

const NextButton = styled(Button)`
    width: 100px;
    font-size: 25px;
    color: #33CEC3;
    background: none;
    border: none;
`;

const ListModeButton = styled(Button)` 
    align-self: flex-start;  
    font-size: 18px; 
    background: none;
    border: none;
    color: #07635C;
    padding: 0;
`;

const PreviousButton = styled(Button)`
    width: 100px;    
    font-size: 25px;
    color: #33CEC3;
    background: none;
    border: none;
`;

const StopwatchWrapper = styled.div`
    width: 50%;
    align-self: flex-start;
`;

const Line = styled.hr`
    border: 1px solid #33CEC3;
    width: 100%;
    margin-bottom: 50px;    
`;


function SingleTaskMode(props: {
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,
}){
    const [index, setindex] = useState(0);
    const {todos, setTodos } = props;

    const setDone = (todoId: number) => {
        setTodos(todos.map(i => {
                if (i.id === todoId) {
                    fetch(prefix + '/api/v1/todos/' + todoId, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({data: i.data, checked: true, id: i.id, order: i.order})
                    });
                    return {data: i.data, checked: true, id: i.id, order: i.order};
                } else {
                    return i;
                }
            }
        ))
    };

    let history = useHistory();
    const handler = () => {
        history.replace('list')
    };

    const getIncompleteTodos = () =>{
        return todos.filter(todo => !todo.checked);
    };

    const incompleteTodos = getIncompleteTodos();

    const nextTodo = () => {
        if (newIndex+1 < incompleteTodos.length){
            setindex(newIndex+1);
        }
    };

    const previousTodo = () => {
        if (newIndex-1 >= 0){
            setindex(newIndex-1);
        }
    };

    const newIndex = Math.min(incompleteTodos.length-1, index);

    const handleCompleteButton = () => {
        if (incompleteTodos.length > 0){
            setDone(incompleteTodos[newIndex].id);
            nextTodo();
        }
    };

    return (
        <Wrapper>
            <WrapperTodo>
                <TodoText>{incompleteTodos.length > 0 ? incompleteTodos[newIndex].data : "Нет заданий"}</TodoText>
            </WrapperTodo>
            <Line />
            <WrapperButtons>
                <PreviousButton onClick={previousTodo}> 🠜 </PreviousButton>
                <CompleteButton onClick={handleCompleteButton}> Выполненно! </CompleteButton>
                <NextButton onClick={nextTodo}> 🠞 </NextButton>
            </WrapperButtons>
            <StopwatchWrapper>
                <Stopwatch />
            </StopwatchWrapper>
            <ListModeButton onClick={handler}>К списку</ListModeButton>
        </Wrapper>
    )
}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { setTodos }
)(SingleTaskMode);
