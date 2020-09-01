import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';


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

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const StartButton = styled(Button)`
    height: 100%;
`;

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


        return <h1>{formatTime(sec)}</h1>;
    }

     return (
         <WrapperTimer>
             <Timer>
                <Counter />
             </Timer>
             <StartButton onClick={() => setIsRunning(!isRunning)}>►</StartButton>
         </WrapperTimer>
     )

}
