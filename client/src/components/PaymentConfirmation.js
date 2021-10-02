import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "./Header";

const PaymentConfirmation = () => {

    const tool = JSON.parse(localStorage.getItem("paidRent"));
    const fromDate = localStorage.getItem("fromDate");
    const toDate = localStorage.getItem("toDate");

    return (
        <>
            <Header />
            <UploadText>Payment Confirmed</UploadText>

            <Details>
                <ConfirmationDetails>
                    <DetailsSpan>Tool: </DetailsSpan>
                    {tool.toolName}
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <DetailsSpan>From: </DetailsSpan>
                    {fromDate}
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <DetailsSpan>To: </DetailsSpan>
                    {toDate}
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <DetailsSpan>Pickup location: </DetailsSpan>
                    {tool.city} 
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <DetailsSpanReturn>Please return the tool by <TimeSpan>5pm</TimeSpan> of the last day of reservation</DetailsSpanReturn>
                </ConfirmationDetails>
            </Details>
        </>
    )
}

const UploadText = styled.h1`

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 50px 0;
`;

const Details = styled.div`
    
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: black solid 2px;
`;

const ConfirmationDetails = styled.div`

    margin-bottom: 10px;
`;

const DetailsSpan = styled.span`

    font-weight: bold;
`;

const DetailsSpanReturn = styled.div`

    font-size: 13px;
    font-style: italic;
    margin-top: 20px;
`;

const TimeSpan = styled.span`

    text-decoration: underline;
    font-weight: bold;
`;

export default PaymentConfirmation;