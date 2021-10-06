import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import Header from "./Header";


const MyRents = () => {

    const [tools, setTools] = useState([]);
    const [status, setStatus] = useState("loading");

    const { renterId } = useParams();
    let history = useHistory();

    useEffect(() => {

        // fetches the currently loged in users rented tools
        fetch(`/getRentedTools/${renterId}`)
        .then(res => res.json())
        .then(data => {
            console.log("myTools data", data.data)
            setTools(data.data)
            setStatus('idle')
            })
        .catch(error => console.log("home fetch error: ", error))
    }, [])

    return (
        <Wrapper>
            <Header />
            <ToolsSpanDiv>Currently Renting</ToolsSpanDiv>
            <ToolsDiv>
            {
                // if the user is renting tools, display each one
                tools.length ?
                tools.map(tool => {

                    return(
                        <React.Fragment key={Math.floor(Math.random()*14000000000)}>
                            <ToolDiv>

                                <ToolInfoDiv>
                                    {tool.toolName}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    {tool.pricePerDay}$/day
                                </ToolInfoDiv>


                                <ToolInfoDiv>
                                    where: {tool.city}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    Return Date: {tool.toDate}
                                </ToolInfoDiv>

                                <ToolInfoDiv>
                                    <ToolImg src={tool.imgUrl}/>
                                </ToolInfoDiv>

                                <ToolOwnerInfoDiv>
                                    Renting from: {tool.ownerId}
                                </ToolOwnerInfoDiv>

                                <BtnDiv>
                                    <Btn onClick={() => {history.push(`/chat`)}}>
                                        chat
                                    </Btn>
                                </BtnDiv>

                            </ToolDiv>
                        </React.Fragment>
                    )
                }) :

                <NotRenting>
                    You're not currently renting any tools
                </NotRenting>
            }
            </ToolsDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;

const ToolsDiv = styled.div`

    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 1150px;
    left: 20%;
    top: 125px;
    margin-right: 0;
`;

const ToolsSpanDiv = styled.h1`

    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, -50%);
    margin: 50px 0;
`;

const ToolDiv = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 8px;
    border-image: linear-gradient(to left, black, #ff7366) 1 0;
    width: 300px;
    margin: 100px 0 10px 75px;
`;

const ToolInfoDiv = styled.div`

    margin: 5px 15px;
`;

const ToolOwnerInfoDiv = styled.div`

    margin: 5px 15px;
    font-size: 13px;
`;

const ToolImg = styled.img`

    width: 200px;
    height: 150px;
    object-fit: contain;
`;

const BtnDiv = styled.div`

`;

const Btn = styled.button`

    background-color: black;
    color: #ff7366;
    border: none;
    font-size: 15px;
    padding: 5px 10px 7px 10px;
    border-radius: 3px;
    margin: 10px 15px;
    font-weight: bold;
`;

const NotRenting = styled.div`

    position: absolute;
    margin-top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
`;


export default MyRents;