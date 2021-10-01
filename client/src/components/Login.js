import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Login = () => {

    const user = localStorage.getItem('userId')

    const[userEmail, setUserEmail] = useState(null)
    const[userPw, setUserPw] = useState(null)

    let history = useHistory();

    const handleSubmit = (e) => {

        e.preventDefault();
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
                // todo: maybe?
                history.push('/')
            } else {
                alert(data.message)
            }
        })
    }

    const handleChangeId = (e) => {
        setUserEmail(e.target.value)
    }

    const handleChangePw = (e) => {
        setUserPw(e.target.value)
    }

    return (
        <>
            <LoginWrap>
                {
                    <>
                        <SigninForm onSubmit={handleSubmit}>
                            <SigninInput  onChange={handleChangeId} type="text" placeholder="E-mail"/>
                            <SigninInput onChange={handleChangePw} type="password" placeholder="Password"/>
                            <SubmitInput type="submit" value="Submit"/>
                        </SigninForm>
                    </>
                }
            </LoginWrap>
        </>
    )
}

const LoginWrap = styled.div`

`;

const SigninForm = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: black solid 1px;
    padding: 15px;
    border-radius: 5px;
`;

const SubmitInput = styled.input`

    width: fit-content;
`;

const SigninInput = styled.input`

    margin-bottom: 20px;
`;

export default Login;