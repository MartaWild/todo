import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-left: 20px;
`;

const WrapperTodo = styled.div`
    display: flex;
    flex-direction: row; 
`;

const TodoText = styled.li`
  list-style-type: none;
  margin-right: 10px;
`;

const Time = styled.div``;

const WrapperButtons = styled.div``;

const DeleteButton = styled.button``;

const CompleteButton = styled.button``;

const NextButton = styled.button``;

const WrapperTimer = styled.div`
    display: flex;
    flex-direction: row; 
`;

const Timer = styled.div``;

const StartButton = styled.button``;

export default function SingleTaskMode() {
    return (
        <Wrapper>
            <WrapperTodo>
                <TodoText>sdfsdf</TodoText>
                <Time>15:00</Time>
            </WrapperTodo>
            <WrapperButtons>
                <DeleteButton>X</DeleteButton>
                <CompleteButton>Check</CompleteButton>
                <NextButton>→</NextButton>
            </WrapperButtons>
            <WrapperTimer>
                <Timer> 0:00 / 1:15 </Timer>
                <StartButton>►</StartButton>
            </WrapperTimer>
        </Wrapper>
    )
}