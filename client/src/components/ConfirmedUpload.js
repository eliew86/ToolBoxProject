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

                <ConfirmationDetails>
                    <DetailsSpan>Price: </DetailsSpan>
                    {formData.pricePerDay} $/day
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <DetailsSpan>Location: </DetailsSpan>
                    {formData.city}
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <DetailsSpan>Uploaded by: </DetailsSpan>
                    {formData.ownerId}
                </ConfirmationDetails>

                <ConfirmationDetails>
                    <ToolImg src={formData.imgUrl}/>
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
    border: solid 8px;
    border-image: linear-gradient(to top, black, orange) 1 1;
`;

const ConfirmationDetails = styled.div`

    margin: 5px 15px;
`;

const DetailsSpan = styled.span`

`;

const ToolImg = styled.img`

    width: 200px;
    height: 150px;
    object-fit: contain;
`;

export default ConfirmedUpload;