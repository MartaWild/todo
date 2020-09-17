import React, {useState} from 'react';
import styled from "styled-components";
import {useHistory} from "react-router";
import {prefix} from "../prefix";
import {connect} from "react-redux";
import {loadTodos} from "../redux/actions";

const LoginWrapper = styled.div`
    padding-left: 50px;
    padding-right: 50px;
    box-sizing: border-box;
    width: 50%;
`;

const InputWrapper = styled.div`
    display: inline-block;
    width: 100%;        
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
    margin-left: 72%;
    margin-top: 27%;
`;
const LoginText = styled.div`
    margin-bottom: 10px;
`;

const PasswordText = styled.div`
    margin-bottom: 10px;
`;

function Authorization(props: {loadTodos: () => void}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const authorization = (login: string, password: string) => {
        fetch(prefix + '/api/v1/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login, password}),
            credentials: 'include'
        }).then( (res) => {
            if(res.ok){
                props.loadTodos();
                history.replace('list');
            } else {
                alert('Неправильный логин или пароль')
            }
        });
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
                <PasswordInput type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            </InputWrapper>
            <ButtonWrapper>
                <LoginButton onClick={() => authorization(login, password)}> Войти </LoginButton>
            </ButtonWrapper>
        </LoginWrapper>
    )
}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { loadTodos }
)(Authorization);