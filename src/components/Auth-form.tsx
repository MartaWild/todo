import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div``;

const FormWindow = styled.div``;

const InputWrapper = styled.div``;

const LoginInput = styled.input``;

const PasswordInput = styled.input``;

const ButtonWrapper = styled.div``;

const RegisterButton = styled.button``;

const LoginButton = styled.button``;

export default function AuthForm(){
    let history = useHistory();
    const handler = () => {
        history.replace('/list')
    };

    return (
        <Wrapper>
            <FormWindow>
                <InputWrapper>
                    <LoginInput>

                    </LoginInput>
                    <PasswordInput>

                    </PasswordInput>
                </InputWrapper>
                <ButtonWrapper>
                    <RegisterButton> Регистрация </RegisterButton>
                    <LoginButton onClick={handler}> Войти </LoginButton>
                </ButtonWrapper>
            </FormWindow>
        </Wrapper>
    )
}