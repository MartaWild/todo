import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { prefix } from "../prefix";
import { loadTodos } from "../redux/actions";
import { connect } from "react-redux";

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 5%;
    padding: 0;
    width: 80vw;    
    font-size: 18px;
    font-family: 'Cousine', monospace;
    user-select: none;
    color: #07635C;
`;

const FormWindow = styled.div`
    display: flex;
    flex-direction: column;
    background: #D2FAF7;
    border-radius: 26px;
    width: 438px;
    height: 308px;
    margin-left: auto;
    margin-right: auto;    
    align-items: center;
    padding: 30px;
    justify-content: center;
    
`;

const InputWrapper = styled.div`
    margin-bottom: 20px;
    display: inline-block;
    width: 70%;        
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
    border-radius: 2px;    
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
    border-radius: 2px;
`;

const ButtonWrapper = styled.div`
    margin-top: 30px;

`;

const RegisterButton = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #07635C;
    margin-right: 70px;
    cursor: pointer;
    background: none;
    border: none;
    height: 40px;
    padding: 10px;
`;

const LoginButton = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    height: 40px;
    width: 100px;
    cursor:pointer;
    border: none;
`;
const LoginText = styled.div`
    margin-bottom: 10px;
`;

const PasswordText = styled.div`
    margin-bottom: 10px;
`;


function AuthForm(props: {loadTodos: () => void}){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const registration = (login: string, password: string) => {
        fetch(prefix + '/api/v1/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password}),
            credentials: 'include'
        });
        history.replace('/list');
    };

    const authorization = (login: string, password: string) => {
        fetch(prefix + '/api/v1/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password}),
            credentials: 'include'
        }).then( (res) => {
            if(res.ok){
                props.loadTodos();
                history.replace('/list');
            } else {
                alert('Неправильный логин или пароль')
            }
        });
    };

    return (
        <Wrapper>
            <FormWindow>
                <InputWrapper>
                    <LoginText>
                        Логин
                    </LoginText>
                    <LoginInput type='text' value={login} onChange={(event) => setLogin(event.target.value)} />
                    <PasswordText>
                        Пароль
                    </PasswordText>
                    <PasswordInput type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                </InputWrapper>
                <ButtonWrapper>
                    <RegisterButton onClick={() => registration(login, password)}> Регистрация </RegisterButton>
                    <LoginButton onClick={() => authorization(login, password)}> Войти </LoginButton>
                </ButtonWrapper>
            </FormWindow>
        </Wrapper>
    )
}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { loadTodos }
)(AuthForm);