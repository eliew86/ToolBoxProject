import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import Header from "./Header";

const initialState = {

    cardNumber: "",
    expirationDate: "",
    ccv: ""
}

const Payment = () => {

    const [tool, setTool] = useState(null);
    const [status, setStatus] = useState("loading");
    const [ccFormData, setCcFormData] = useState(initialState);
    const [subStatus, setSubStatus] = useState("idle");

    let history = useHistory();

    const { _id } = useParams();

    useEffect(() => {

        fetch(`/getTools/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Payment", data.data)
                setTool(data.data)
                setStatus('idle')
            })
    }, [])

    const validatePayment = (e) => {

        e.preventDefault();
        setSubStatus("pending");
        fetch("/paymentValidate", {
            method: "POST",
            body: JSON.stringify(ccFormData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((data) => {
            const { status, error } = data;
            if(status === 200){
                window.localStorage.setItem("paidRent", JSON.stringify(tool));
                setSubStatus("confirmed");
                history.push("/paymentConfirmation");
            } else {
                setSubStatus("error");
                alert(data.message);
            }
        })
    }

    const handleChangeInput = (value, name) => {
        const newCcFormData = {...ccFormData};
        newCcFormData[name] = value;
        setCcFormData(newCcFormData);
    };

    return (
        
        <>  
            <Header />
            {
                status === "loading" ?
                "loading" :
                <>

                    <PaymentDiv>

                        <ToolInfo>
                                <ToolInfoDiv>
                                    <InfoTitleSpan>Tool name: </InfoTitleSpan>{tool.toolName}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    <InfoTitleSpan>Category: </InfoTitleSpan>{tool.category}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    <InfoTitleSpan>Type: </InfoTitleSpan>{tool.type}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    <InfoTitleSpan>Location: </InfoTitleSpan>{tool.city}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    <InfoTitleSpan>Price per day: </InfoTitleSpan>{tool.pricePerDay}$/day
                                </ToolInfoDiv>

                                <ImgDiv>
                                    <ToolImg src={tool.imgUrl}/>
                                </ImgDiv>
                        </ToolInfo>

                        <PaymentInfo>
                            <Form onSubmit={validatePayment}>
                                <Input 
                                    type="text" 
                                    name="cardNumber"
                                    placeholder="Card number"
                                    maxLength="16"
                                    onChange={(e) => handleChangeInput(e.target.value, "cardNumber")}
                                    required
                                />
                                <Input 
                                    type="text"
                                    name="expirationDate"
                                    placeholder="Expiration data (00/00)"
                                    maxLength="5"
                                    onChange={(e) => handleChangeInput(e.target.value, "expirationDate")}
                                    required
                                />
                                <Input 
                                    type="text"
                                    name="ccv"
                                    placeholder="CCV"
                                    maxLength="3"
                                    onChange={(e) => handleChangeInput(e.target.value, "ccv")}
                                    required
                                />
                                <Submit type="submit">Submit</Submit>
                            </Form>
                        </PaymentInfo>

                    </PaymentDiv>
                </>
            }
        </>
    )
}

const PaymentDiv = styled.div`

    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ToolInfo = styled.div`

    margin-right: 50px;
`;

const PaymentInfo = styled.div`

    margin-left: 50px;
`;

const ToolInfoDiv = styled.div`

    font-size: 15px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-bottom: 12px;
`;

const InfoTitleSpan = styled.span`

    color: black;
    font-weight: bold;
`;

const ImgDiv = styled.div`

`;

const ToolImg = styled.img`

    width: 150px;
`;

const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`

    margin-bottom: 25px;
`;

const Submit = styled.button`

    width: fit-content;
`;

export default Payment;