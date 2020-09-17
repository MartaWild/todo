import React from 'react';
import styled from 'styled-components';
import Registration from "./Registration";
import Authorization from "./Authorization";

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 5%;
    padding: 0;
    width: 90vw;    
    font-size: 18px;
    font-family: 'Cousine', monospace;
    user-select: none;
    color: #07635C;
`;

const FormWindow = styled.div`
    display: flex;
    flex-direction: row;
    background: #D2FAF7;
    border-radius: 26px;
    width: 60vw;
    height: 50vh;
    margin-left: auto;
    margin-right: auto;    
    align-items: center;
    padding: 30px;
    justify-content: center;
    padding-top: 60px;
    
`;

const Line = styled.hr`
    border: 1px solid #33CEC3;
    width: 0; 
    height: 100%;
`;

export default function AuthForm(){

    return (
        <Wrapper>
            <FormWindow>
                <Registration />
                <Line />
                <Authorization />
            </FormWindow>
        </Wrapper>
    )
}

