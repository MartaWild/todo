import React, { useState } from 'react';
import styled from "styled-components";
import { useHistory } from "react-router";
import { prefix } from "../prefix";
import { connect } from "react-redux";
import { loadTodos } from "../redux/actions";

const LoginWrapper = styled.div`
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
    width: 80%;
    
    @media only screen and (max-width: 750px){
      width: 100%;    
      padding-left: 3%;
      padding-right: 3%;
    }
`;

const InputWrapper = styled.div`
    display: inline-block;
    width: 100%;   
    margin-top: 1%;   
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
    
    @media only screen and (max-width: 750px){
      font-size: 16px;
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
    
    @media only screen and (max-width: 750px){
      font-size: 16px;
       margin-bottom: 10%;
    }  
    
    &:focus {
      outline: none;
    }
 
`;

const Hidden = styled.div`
    padding: 3%;
    width: 100%;
    visibility: hidden; 
    font-size: 19px;
    box-sizing: border-box;    
    margin-bottom: 15%;
    
    @media only screen and (max-width: 750px){
      font-size: 16px;
      margin-bottom: 10%;
    }
`;


const ButtonWrapper = styled.div``;

const LoginButton = styled.button`
    font-size: 19px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    height: 40px;
    width: 100px;
    cursor: pointer;
    border: none;
    margin-bottom: 10%;
    
    @media only screen and (max-width: 750px){
        margin-top: 0;
    }
    
    &:focus {
      outline: none;
    }
`;
const LoginText = styled.div`
    margin-bottom: 10px;
`;

const PasswordText = styled.div`
    margin-bottom: 10px;
`;

function AuthorizationBase(props: { loadTodos: () => void }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const authorization = (login: string, password: string) => {
        if (login === '' || password === '') {
            alert('Введите логин и пароль!');
            return;
        }
        fetch(prefix + '/api/v1/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password}),
            credentials: 'include'
        }).then((res) => {
            if (res.ok) {
                props.loadTodos();
                history.replace('list');
            } else {
                alert('Неправильный логин или пароль')
            }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            authorization(login, password);
        }
    };

    return (
        <LoginWrapper>
            <InputWrapper>
                <LoginText>
                    Логин
                </LoginText>
                <LoginInput type='text' value={login} onChange={(event) => setLogin(event.target.value)}/>
                <PasswordText>
                    Пароль
                </PasswordText>
                <PasswordInput
                    type='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Hidden> &nbsp;  апрарапрап </Hidden>
            </InputWrapper>
            <ButtonWrapper>
                <LoginButton onClick={() => authorization(login, password)}> Войти </LoginButton>
            </ButtonWrapper>
        </LoginWrapper>
    )
}

export const Authorization = connect(
    (state: any) => ({todos: state.todos}),
    {loadTodos}
)(AuthorizationBase);