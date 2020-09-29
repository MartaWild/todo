import React, { useState } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import { Todo } from '../types';
import Stopwatch from "./Stopwatch";
import { prefix } from "../prefix";
import { connect } from "react-redux";
import { setTodos} from "../redux/actions";
import { GlobalStyle } from "./GlobalStyle";
import Arrow from '../arrow.svg'

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    cursor:pointer;
    border: none;
    padding: 1% 3% 1% 3%;
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
    
    @media only screen and (max-width: 780px){    
      width: 80vw; 
    }
`;

const WrapperTodo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
    min-height: 260px;
    background: rgba(210, 250, 247, 0.7);
    width: 100%;
    border-radius: 26px;
    
    @media only screen and (max-width: 1024px){    
      min-height: 230px;
    }
  
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

const CompleteButton = styled(Button)``;



const ListModeButton = styled(Button)` 
    align-self: flex-start;  
    font-size: 15px; 
    background: none;
    border: none;
    color: #07635C;
    padding: 0;    
    margin-top: 13vh;
    
    @media only screen and (max-height: 670px){    
      margin-top: 5vh;
    }

`;
const NextButton = styled.img`
    width: 30px;
    align-items: center;
    padding: 0;
`;

const PreviousButton = styled.img`
    width: 30px;
    align-items: center;
    padding: 0;
    transform: scale(-1,1);

`;

const StopwatchWrapper = styled.div``;

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
                        body: JSON.stringify({data: i.data, checked: true, id: i.id, order: i.order, time: i.time})
                    });
                    return {data: i.data, checked: true, id: i.id, order: i.order, time: i.time};
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

    if (incompleteTodos.length > 0){
        return (
            <Wrapper>
                <GlobalStyle />
                <WrapperTodo>
                    <TodoText>{incompleteTodos.length > 0 ? incompleteTodos[newIndex].data : "Нет заданий"}</TodoText>
                </WrapperTodo>
                <Line />
                <WrapperButtons>
                    <PreviousButton src={Arrow} onClick={previousTodo} />
                    <CompleteButton onClick={handleCompleteButton}> Выполнено! </CompleteButton>
                    <NextButton src={Arrow} onClick={nextTodo} />
                </WrapperButtons>
                <StopwatchWrapper>
                    <Stopwatch id={todos[newIndex].id}/>
                </StopwatchWrapper>
                <ListModeButton onClick={handler}>К списку</ListModeButton>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <GlobalStyle />
            <WrapperTodo>
                <TodoText>{incompleteTodos.length > 0 ? incompleteTodos[newIndex].data : "Нет заданий"}</TodoText>
            </WrapperTodo>
            <ListModeButton onClick={handler}>К списку</ListModeButton>
        </Wrapper>
    )
}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { setTodos }
)(SingleTaskMode);
