import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import background from "../img/background.jpg";
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
    // const [flag, setFlag ] = useState(false);

    let history = useHistory();
    const user = localStorage.getItem('user');
    const toDate = localStorage.getItem('toDate');
    const totalPrice = localStorage.getItem('totalPrice');

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

                fetch(`/renterIdUpdate/${_id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        renterId : user,
                        toDate: toDate
                    }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    const { status, error } = data;
                    if(status === 200){
                        setSubStatus("confirmed");
                        history.push("/paymentConfirmation");
                    } else if(error){
                        setSubStatus("error");
                        alert(error.message);
                    }
                })
            } else {
                setSubStatus("error");
                alert(data.message);
            }
        });

            
    }

    const handleChangeInput = (value, name) => {
        const newCcFormData = {...ccFormData};
        newCcFormData[name] = value;
        setCcFormData(newCcFormData);
    };

    return (
        
        <Wrapper>  
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

                                <ToolInfoDiv>
                                    <InfoTitleSpan>Total price: </InfoTitleSpan>{totalPrice}$
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
                                    minLength="4"
                                    maxLength="5"
                                    onChange={(e) => handleChangeInput(e.target.value, "expirationDate")}
                                    required
                                />
                                <Input 
                                    type="text"
                                    name="ccv"
                                    placeholder="CCV"
                                    minLength="3"
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
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;

const PaymentDiv = styled.div`

    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ToolInfo = styled.div`

    margin-right: 50px;
    padding: 30px;
    border: solid 8px;
    border-image: linear-gradient(to top, black, orange) 1 0 0 1;
`;

const PaymentInfo = styled.div`

    margin-left: 50px;
    padding: 30px;
    border: solid 8px;
    border-image: linear-gradient(to top, black, orange) 0 1 1 0;
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

    margin-bottom: 35px;
`;

const Submit = styled.button`

    width: fit-content;
    background-color: black;
    color: #ff7366;
    border: none;
    font-size: 15px;
    padding: 5px 10px 7px 10px;
    border-radius: 3px;
    margin-top: 75px;
`;

export default Payment;