import React, { useState } from 'react';
import styled from "styled-components";
import {useHistory} from "react-router";
import {prefix} from "../prefix";

const RegistrationWrapper = styled.div`
    width: 80%;
    box-sizing: border-box;
    padding-left: 5%;
    padding-right: 5%;
    
    @media only screen and (max-width: 780px){    
      width: 100%;
      padding-left: 3%;
      padding-right: 3%;
    }
    
`;

const InputWrapper = styled.div`
    display: inline-block;
    width: 100%;  
`;

const LoginText = styled.div`
    margin-bottom: 5%;    
`;

const LoginInput = styled.input`
    padding: 3%;
    width: 100%;
    font-size: 19px;
    font-family: 'Cousine', monospace;
    color: #07635C;
    margin-bottom: 5%;
    border: none;
    box-sizing: border-box;
    border-radius: 5px;    
    background: rgba(255, 255, 255, 0.8);
    
    @media only screen and (max-width: 780px){
      margin-bottom: 10%;
    }
    
    &:focus {
      outline: none;
    }
`;

const PasswordInput = styled.input`
    padding: 3%;
    width: 100%;
    font-size: 19px;
    font-family: 'Cousine', monospace;
    color: #07635C;
    border: none;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 5%;
    background: rgba(255, 255, 255, 0.8);
    
    @media only screen and (max-width: 780px){
      margin-bottom: 10%;
    }
    
    &:focus {
      outline: none;
    }
 `;
const PasswordText = styled.div`
     margin-bottom: 5%;   
    
`;

const ButtonWrapper = styled.div`
    margin-top: 3%;
    width: 100%;
    
    @media only screen and (max-width: 780px){
        margin-top: 0;
    }
`;

const RegisterButton = styled.button`
    font-size: 19px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    height: 40px;
    cursor: pointer;
    border: none;
    margin-bottom: 10%;
    padding: 0 5% 0 5%;
    
    @media only screen and (max-width: 780px){
        margin-top: 5%;
    }
    
    &:focus {
      outline: none;
    }
`;

export function Registration(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');


    let history = useHistory();


    const registration = (login: string, password: string) => {
        if (login === '' || password === '') {
            alert('Введите логин и пароль!');
            return;
        }
        if (password === passwordCheck){
            fetch(prefix + '/api/v1/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login, password}),
                credentials: 'include'
            }).then((res) => {
                if (res.ok) {
                    history.replace('list');
                } else {
                    alert('Что-то пошло не так!')
                }
            })
        } else {
            alert('Пароли не совпадают!')
        }

    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            registration(login, password);
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
                <PasswordInput
                    type='password'
                    value={passwordCheck}
                    onChange={(event) => setPasswordCheck(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </InputWrapper>
            <ButtonWrapper>
                <RegisterButton onClick={() => registration(login, password)}> Регистрация </RegisterButton>
            </ButtonWrapper>
        </RegistrationWrapper>
    )
}