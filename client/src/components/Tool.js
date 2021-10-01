import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const Tool = ({ _id, category, city, pricePerDay, toolName, type, imgUrl}) => {

    let history = useHistory();

    function handleClick(){
        history.push(`/getTools/${_id}`)
    }

    return (
        <>
                <ToolDiv>

                    <ToolInfoDiv>
                        {toolName}
                    </ToolInfoDiv>

                    <ToolInfoDiv>
                        {pricePerDay}$/day
                    </ToolInfoDiv>

                    <ToolInfoDiv>
                        where: {city}
                    </ToolInfoDiv>

                    <ToolInfoDiv>
                        <ToolImg src={imgUrl} onClick={handleClick}/>
                    </ToolInfoDiv>
                </ToolDiv>
        </>
    )
}

const ToolDiv = styled.div`

    display: flex;
    flex-direction: column;
    border: solid 2px black;
    width: fit-content;
    margin: 100px 0 10px 75px;
`;

const ToolImg = styled.img`

    width: 200px;
    height: 150px;

    &:hover{
        opacity: .5;
        transition: 0.25s;
    }
`;

const ToolInfoDiv = styled.div`

    margin: 5px 15px;
`;

export default Tool;