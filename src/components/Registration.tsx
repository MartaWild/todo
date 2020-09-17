import React, { useState } from 'react';
import styled from "styled-components";
import {useHistory} from "react-router";
import {prefix} from "../prefix";

const RegistrationWrapper = styled.div`
    width: 50%;
    padding-left: 50px;
    padding-right: 50px;
    box-sizing: border-box;
`;

const InputWrapper = styled.div`
    display: inline-block;
    width: 100%;        
`;

const LoginText = styled.div`
    margin-bottom: 10px;
`;

const LoginInput = styled.input`
    padding: 10px;
    width: 100%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
    margin-right: 10px;
    color: #07635C;
    margin-bottom: 30px;
    border: none;
    box-sizing: border-box;
    border-radius: 5px;    
`;

const PasswordText = styled.div`
    margin-bottom: 10px;
`;

const PasswordInput = styled.input`
    padding: 10px;
    width: 100%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
    margin-right: 10px;
    color: #07635C;
    border: none;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const RegisterButton = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #07635C;
    cursor: pointer;
    background: none;
    border: none;
    height: 40px;
    padding: 10px;
    margin-left: 61%;
`;

export default function Registration(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');


    let history = useHistory();

    const registration = (login: string, password: string) => {
        if (password === passwordCheck){
            fetch(prefix + '/api/v1/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login, password}),
                credentials: 'include'
            });
            history.replace('list');
        } else {
            alert('Пароли не совпадают!')
        }

    };


    return (
        <RegistrationWrapper>
            <InputWrapper>
                <LoginText>
                    Логин
                </LoginText>
                <LoginInput type='text' value={login} onChange={(event) => setLogin(event.target.value)} />
                <PasswordText>
                    Пароль
                </PasswordText>
                <PasswordInput type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                <PasswordText>
                    Повторите пароль
                </PasswordText>
                <PasswordInput type='password' value={passwordCheck} onChange={(event) => setPasswordCheck(event.target.value)} />
            </InputWrapper>
            <ButtonWrapper>
                <RegisterButton onClick={() => registration(login, password)}> Регистрация </RegisterButton>
            </ButtonWrapper>
        </RegistrationWrapper>
    )
}