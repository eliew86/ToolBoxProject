import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { useHistory } from "react-router-dom";

const {v4: uuidv4} = require("uuid");

const initialState = {

    _id: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}

const Signup = () => {

    let history = useHistory();

    const [formData, setFormData] = useState(initialState);
    const [subStatus, setSubStatus] = useState("idle");

    const handleSubmit = (e) => {

        e.preventDefault();
        setSubStatus("pending");
        fetch("/addProfile", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const { status, error } = data;
            if (status === 200) {
                setSubStatus("confirmed");
                history.push("/login");
            } else {
                setSubStatus("error");
                alert("Unable to create profile")
            }
        })

    }

    const handleChangeInput = (value, name) => {
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    };

    return (
        <>
            <Header />
            <SignupWrap>
            {
                <>
                    <SignupForm onSubmit={handleSubmit}>
                        <SignupInput 
                            type="text" 
                            placeholder="First Name"
                            name="firstName"
                            onChange={(e) => handleChangeInput(e.target.value, "firstName")}
                        />
                        <SignupInput 
                            type="text" 
                            placeholder="Last Name"
                            name="lastName"
                            onChange={(e) => handleChangeInput(e.target.value, "lastName")}
                        />
                        <SignupInput 
                            type="email" 
                            placeholder="E-mail"
                            name="email"
                            onChange={(e) => handleChangeInput(e.target.value, "email")}
                        />
                        <SignupInput 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChangeInput(e.target.value, "password")}
                        />
                        <SubmitInput type="submit" value="Submit" />
                    </SignupForm>
                </>
            }
            </SignupWrap>
        </>
    )

}

const SignupWrap = styled.div`

`;

const SignupForm = styled.form`

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

const SignupInput = styled.input`

    margin-bottom: 20px;
`;

const SubmitInput = styled.input`

    width: fit-content;
`;

export default Signup;