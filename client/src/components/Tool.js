import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// render each tool's info
const Tool = ({ _id, city, pricePerDay, toolName, imgUrl, isAvailable}) => {

    let history = useHistory();

    // if the user clicks on the tool images, he gets sent to the tools info page
    // where he can also choose to rent the tool
    function handleClick(){
        history.push(`/getTools/${_id}`)
    }

    return (
        <Wrapper>
            {
                isAvailable ? 
                    <ToolDiv>

                        <ToolInfoDiv>
                            Name: {toolName}
                        </ToolInfoDiv>

                        <ToolInfoDiv>
                            {pricePerDay} $/day
                        </ToolInfoDiv>

                        <ToolInfoDiv>
                            where: {city}
                        </ToolInfoDiv>

                        <ToolInfoDiv>
                            <ToolImg src={imgUrl} onClick={handleClick}/>
                        </ToolInfoDiv>
                    </ToolDiv> :
                    ""
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;

const ToolDiv = styled.div`

    display: flex;
    flex-direction: column;
    border: solid 8px;
    border-image: linear-gradient(to left, black, #ff7366) 1 0;
    width: fit-content;
    margin: 100px 50px 10px 75px;
`;

const ToolImg = styled.img`

    width: 200px;
    height: 150px;
    object-fit: contain;

    &:hover{
        opacity: .5;
        transition: 0.25s;
    }
`;

const ToolInfoDiv = styled.div`

    margin: 5px 15px;
`;

export default Tool;