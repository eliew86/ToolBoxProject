import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Input = ({name, type, placeholder, handleChangeInput}) => {
    
    return (
        <>
            <StyledInput 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={(ev) => handleChangeInput(ev.target.value, name)}
                required
            />
        </>
    )

}

const StyledInput = styled.input`

    margin-bottom: 15px;
`;

export default Input;