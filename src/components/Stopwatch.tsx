import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';

const WrapperTimer = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    margin-bottom: 10px;
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
    font-size: 18px;
`;

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #07635C;
`;

const StartButton = styled(Button)`
    height: 100%;
`;

const ResetButton = styled(Button)`
    height: 100%;
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



export default function StopWatch() {
    const [sec, setSec] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [delay, setDelay] = useState(1000);

    const formatTime = (totalSeconds: number) =>{
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${hours} : ${minutes} : ${seconds}`
    };

    function Counter() {
        useInterval(() => {
            setSec(sec + 1);
        }, isRunning ? delay : null);


        return <p>{formatTime(sec)}</p>;
    }

     return (
         <WrapperTimer>
             <Timer>
                <Counter />
             </Timer>
             <StartButton onClick={() => setIsRunning(!isRunning)}> ► </StartButton>
             <ResetButton onClick={() => {setIsRunning(false); setSec(0)}}> Сброс </ResetButton>
         </WrapperTimer>
     )

}
