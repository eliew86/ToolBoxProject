import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ImageInput = () => {

    return (

        <>
            <Input 
                type="file" 
                name="image"
                required
            />
        </>
    )
}

const Input = styled.input`

    margin-bottom: 15px;
`;

export default ImageInput;