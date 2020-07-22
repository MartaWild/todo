import React from 'react';
import styled from 'styled-components'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

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

export default function SingleTaskMode() {
    let history = useHistory();
    const handler = () => {
        history.replace('/')
    };

    return (
        <Wrapper>
            <WrapperTodo>
                <TodoText>sdfsdf</TodoText>
                <Time>15:00</Time>
            </WrapperTodo>
            <WrapperButtons>
                <PreviousButton>←</PreviousButton>
                <CompleteButton>Done!</CompleteButton>
                <DeleteButton>X</DeleteButton>
                <InfoButton>?</InfoButton>
                <NextButton>→</NextButton>
            </WrapperButtons>
            <WrapperTimer>
                <Timer> 0:00 / 1:15 </Timer>
                <StartButton>►</StartButton>
            </WrapperTimer>
            <ListModeButton onClick={handler}>Весь список</ListModeButton>
        </Wrapper>
    )
}