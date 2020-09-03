import React, {useState} from 'react';
import styled from 'styled-components'
import {useHistory} from "react-router-dom";
import { Todo } from './types';
import Stopwatch from "./Stopwatch";

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
`;

const WrapperTodo = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    margin-bottom: 50px;
`;

const TodoText = styled.li`
      list-style-type: none;
      margin-right: 10px;
      width: 80%;
      text-align: center;
`;

const Time = styled.div``;

const WrapperButtons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const DeleteButton = styled(Button)``;

const CompleteButton = styled(Button)``;

const NextButton = styled(Button)``;

const ListModeButton = styled(Button)``;

const InfoButton = styled(Button)``;

const PreviousButton = styled(Button)``;

export default function SingleTaskMode(props: {
    todos : Todo[],
    setDone : (id: number) => void}){

    const [index, setindex] = useState(0);

    let history = useHistory();
    const handler = () => {
        history.replace('/')
    };

    const getIncompleteTodos = () =>{
        return props.todos.filter(todo => todo.checked == false);
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
            props.setDone(incompleteTodos[newIndex].id);
            nextTodo();
        }
    };

    return (
        <Wrapper>
            <WrapperTodo>
                <TodoText>{incompleteTodos.length > 0 ? incompleteTodos[newIndex].data : "Нет заданий"}</TodoText>
            </WrapperTodo>
            <WrapperButtons>
                <PreviousButton onClick={previousTodo}>←</PreviousButton>
                <CompleteButton onClick={handleCompleteButton}> Done! </CompleteButton>
                <NextButton onClick={nextTodo}>→</NextButton>
            </WrapperButtons>
            <Stopwatch />
            <ListModeButton onClick={handler}>Весь список</ListModeButton>
        </Wrapper>
    )
}