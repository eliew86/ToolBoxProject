import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";

const ConfirmedUpload = () => {

    const formData = JSON.parse(localStorage.getItem("formData"));

    console.log("confirmedUpload formData", formData);
    return (
        <>
            <Header />
            <UploadText>Upload Confirmed</UploadText>

            <Details>
                <ConfirmationDetails>
                    <DetailsSpan>Tool name: </DetailsSpan>
                    {formData.toolName}
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

`;

const DetailsSpan = styled.span`

`;

export default ConfirmedUpload;