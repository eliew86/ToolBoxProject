import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Header from "./Header";

const Login = () => {

    const[userEmail, setUserEmail] = useState(null)
    const[userPw, setUserPw] = useState(null)

    let history = useHistory();

    const handleSubmit = (e) => {

        e.preventDefault();

        // verify the userId(email) and password to login
        fetch('/getProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPw
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) {
                window.localStorage.setItem("user", data.data.email);
                history.push('/')
                window.location.reload();
            } else {
                alert(data.message)
            }
        })
    }

    // sets the value written in the input for the userEmail state
    const handleChangeId = (e) => {
        setUserEmail(e.target.value)
    }

    // sets the value written in the input for the userPw state
    const handleChangePw = (e) => {
        setUserPw(e.target.value)
    }

    return (
        <Wrapper>  
            <Header />
            <LoginWrap>
                {
                    <>
                        <ToolsSpanDiv>Login</ToolsSpanDiv>

                        <SigninForm onSubmit={handleSubmit}>
                            <SigninInput  onChange={handleChangeId} type="text" placeholder="E-mail"/>
                            <SigninInput onChange={handleChangePw} type="password" placeholder="Password"/>
                            <SubmitInput type="submit" value="Submit"/>
                        </SigninForm>
                    </>
                }
            </LoginWrap>
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;

const LoginWrap = styled.div`

`;

const ToolsSpanDiv = styled.h1`

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 150px 0;
`;

const SigninForm = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: solid 8px;
    border-image: linear-gradient(to top, black, #ff7366)1;
    padding: 15px;
`;

const SubmitInput = styled.input`

    width: fit-content;
    background-color: black;
    color: #ff7366;
    border: none;
    font-size: 15px;
    padding: 5px 10px 7px 10px;
    border-radius: 3px;

    &:hover{
        color: #ff1500;
        text-decoration: underline;
    }
`;

const SigninInput = styled.input`

    margin-bottom: 20px;
`;

export default Login;