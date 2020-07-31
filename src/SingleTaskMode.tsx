import React, {useState} from 'react';
import styled from 'styled-components'
import {useHistory} from "react-router-dom";
import { Todo } from './types'

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

const WrapperTimer = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    margin-bottom: 10px;
    height: 26px;
`;

const Timer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
`;

const StartButton = styled(Button)`
    height: 100%;
`;

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

    const nextTodo = () => {
        if (index+1 <= props.todos.length-1){
            setindex(index+1)
        }
    };

    const previousTodo = () => {
        if (index-1 >= 0){
            setindex(index-1)
        }
    }

    return (
        <Wrapper>
            <WrapperTodo>
                <TodoText>{props.todos[index].data}</TodoText>
            </WrapperTodo>
            <WrapperButtons>
                <PreviousButton onClick={previousTodo}>←</PreviousButton>
                <CompleteButton onClick={() => {props.setDone(props.todos[index].id); nextTodo()}}>Done!</CompleteButton>
                <NextButton onClick={nextTodo}>→</NextButton>
            </WrapperButtons>
            <WrapperTimer>
                <Timer> 0:00 / 1:15 </Timer>
                <StartButton>►</StartButton>
            </WrapperTimer>
            <ListModeButton onClick={handler}>Весь список</ListModeButton>
        </Wrapper>
    )
}