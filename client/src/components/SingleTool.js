import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";

import Header from "./Header";

const SingleTool = () => {

    const [tool, setTool] = useState(null);
    const [status, setStatus] = useState("loading");

    let history = useHistory();

    const { _id } = useParams();

    useEffect(() => {

        fetch(`/getTools/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log("singleTool", data.data)
                setTool(data.data)
                setStatus('idle')
            })
    }, [])

    return (
        <>
            <Header />
            {
                status === "loading" ?
                "Loading Tool..." :
                <ToolInfo>
                    <ImgDiv>
                        <ToolImg src={tool.imgUrl}/>
                    </ImgDiv>
                    <ToolDiv>
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

                        <BtnDiv>
                            <Btn to={`/payment/${_id}`}>Rent</Btn>
                        </BtnDiv>
                    </ToolDiv>
                </ToolInfo>
            }
            
        </>
    )
}

const ToolInfo = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ToolDiv = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
`;

const ToolInfoDiv = styled.div`

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-bottom: 15px;
`;

const InfoTitleSpan = styled.span`

    color: black;
    font-weight: bold;
`;

const ImgDiv = styled.div`

`;

const ToolImg = styled.img`

    width: 300px;
`;

const BtnDiv = styled.div`

    margin-top: 25px;
`;

const Btn = styled(Link)`

    background-color: black;
    color: #ff7366;
    border: none;
    font-size: 15px;
    padding: 5px 10px 7px 10px;
    border-radius: 3px;
`;

export default SingleTool;