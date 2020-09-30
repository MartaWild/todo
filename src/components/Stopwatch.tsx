import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { setTime } from "../redux/actions";
import { Todo } from "../types";
import Start from '../start.svg';
import Pause from '../pause.svg';
import Reset from '../reset.svg'


const WrapperTimer = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 30px;
    margin-top: 40px;
    height: 26px;
    font-size: 18px;
    color: #07635C;
`;

const Timer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    font-size: 19px;    
    margin-bottom: 10%;
`;

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    height: 40px;
    cursor:pointer;
    border: none;
    padding: 0;
`;

const StartButton = styled.img`
    width: 19px;
`;

const ResetButton = styled.img`
    width: 19px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;



function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<null | (() => void)>(null);

    useEffect(() => {
        if (savedCallback.current !== undefined) {
            savedCallback.current = callback;
        }

    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }

        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


function StopWatch(props: {
    id: number,
    setTime: (time: number, index: number) => void,
    todos: Todo[]
}) {
    const [isRunning, setIsRunning] = useState(false);
    const [delay, setDelay] = useState(1000);
    const { todos, setTime, id } = props;
    const sec = todos.find(todo => todo.id === id)!.time;

    const formatTime = (totalSeconds: number) =>{
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${hours} : ${minutes} : ${seconds}`
    };

    function Counter() {
        useInterval(() => {
            setTime(sec + 1, id);
            localStorage.setItem(id.toString(), (sec+1).toString());
        }, isRunning ? delay : null);

        return <p>{formatTime(sec)}</p>;
    }

     return (
         <WrapperTimer>
             <Timer>
                <Counter />
             </Timer>
             <ButtonWrapper>
                 <StartButton src={isRunning ? Pause : Start} onClick={() => setIsRunning(!isRunning)} />
                 <ResetButton src={Reset} onClick={() => {setIsRunning(false); setTime(0, id)}} />
             </ButtonWrapper>
         </WrapperTimer>
     )

}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { setTime }
)(StopWatch);