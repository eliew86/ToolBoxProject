import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "./Header";
import background from "../img/background.jpg";


const MyTools = () => {

    const [status, setStatus] = useState("loading");
    const [tools, setTools] = useState([]);
    const [subStatus, setSubStatus] = useState("idle");

    const { ownerId } = useParams();

    useEffect(() => {


        fetch(`/getOwnerTools/${ownerId}`)
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
            
            <ToolsSpanDiv>My tools</ToolsSpanDiv>
            <ToolsDiv>
                {
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
                                        <ToolImg src={tool.imgUrl}/>
                                    </ToolInfoDiv>

                                    <BtnDiv>
                                        {
                                            !tool.isAvailable ? 
                                            <Btn onClick={
                                                (e) => {
        
                                                    const _id = tool._id;
                                                    console.log("MyTools _id", _id)
                                                    
                                                    e.preventDefault();
                                                    setSubStatus("pending");
                                                    
                                                    fetch(`/toolStatus/${_id}`, {
                                                        method: "PATCH"
                                                    })
                                                    .then((res) => res.json())
                                                    .then((data) => {
                                                        const { status, error } = data;
                                                        if (status === 200) {
                                                            setSubStatus("confirmed");
                                                            window.location.reload();
                                                        } else if(error){
                                                            setSubStatus("error");
                                                            alert(error.message)
                                                        }
                                                    })

                                                }
                                            }>Make Available</Btn> :
                                            ""
                                        }
                                    </BtnDiv>
                                </ToolDiv>
                            </React.Fragment>
                        )
                    }) :
                    <NotRenting>
                        You have no tools up for rent
                    </NotRenting>
                }
            </ToolsDiv>
        </Wrapper>
    )
}

const Wrapper = styled.div`

    background-image: url(${background});
    background-size: cover;
    height: 100vh;
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
    transform: translate(-50%, -50%);
    margin: 50px 0;
`;

const ToolDiv = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 8px;
    border-image: linear-gradient(to left, black, #ff7366) 1 0;
    width: fit-content;
    margin: 100px 0 10px 75px;
`;

const ToolInfoDiv = styled.div`

    margin: 5px 15px;
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
    margin-bottom: 10px;
`;

const NotRenting = styled.div`

    position: absolute;
    margin-top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
`;

export default MyTools;