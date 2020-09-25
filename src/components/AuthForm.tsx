import React, { useState } from 'react';
import styled from 'styled-components';
import { Registration } from "./Registration";
import { Authorization } from "./Authorization";
import { GlobalStyle } from "./GlobalStyle";

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 2%;
    padding: 0;
    width: 90vw;    
    font-size: 19px;
    font-family: 'Cousine', monospace;
    user-select: none;
    color: #07635C;

`;

const FormWindow = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(210, 250, 247, 0.7);
    border-radius: 26px;
    width: 40vw;
    margin-left: auto;
    margin-right: auto;    
    align-items: center;
    padding: 3% 0 3% 0;
    justify-content: center;
    margin-top: 5vh;
    
    @media only screen and (max-width: 780px) {
        width: 70vw;
        flex-direction: column;
        padding: 8%;
        margin-top: 10%;
    }            
    
`;

const FormChangeButton = styled.button`
    font-size: 17px;
    font-family: 'Cousine', monospace;
    color: #07635C;
    cursor: pointer;
    background: none;
    border: none;
    margin-bottom: 5%;
    margin-left: 40%;
    margin-top: 5%;
    
    @media only screen and (max-width: 780px) {
        margin-bottom: 10%;     
    }    
    
    @media only screen and (max-width: 600px){
        font-size: 14px;
    }   
    
    &:focus {
      outline: none;
    }

`;

export default function AuthForm(){
    const [form, setForm] = useState('registration');

    const handler = () =>{
        if (form === 'registration') {
            setForm('authorization')
        } else if (form === 'authorization'){
            setForm('registration')
        }
    };

    return (
        <Wrapper>
            <GlobalStyle />
            <FormWindow>
                <FormChangeButton onClick={handler}>
                    {form === 'registration' ? 'Есть аккаунт?' : 'Зарегистрироваться?'}
                </FormChangeButton>
                {form === 'registration' ? <Registration /> : <Authorization />}
            </FormWindow>
        </Wrapper>
    )
}

