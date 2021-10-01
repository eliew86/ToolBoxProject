import { load } from "dotenv";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "cloudinary-react";
import Tool from "./Tool";

const Homepage = () => {

    const [status, setStatus] = useState("leading");
    const [tools, setTools] = useState([]);
    const [start, setStart] = useState(0);
    const [filter, setFilter] = useState(null);

    useEffect(() => {

        fetch('/getTools')
        .then(res => res.json())
        .then(data => {
            console.log("home data", data.data)
            setTools(data.data)
            setStatus('idle')
            })
        .catch(error => console.log("home fetch error: ", error))
    }, [])

    return(
        <>
            <MainBody>
                {console.log("home tools", tools)}
                {/* display tools */}
                <div>
                    {
                        <>
                            <ToolsSpanDiv>Available tools</ToolsSpanDiv>

                            <ToolsDiv>
                                {
                                    tools.map(tool => {
                                        
                                        return(
                                            <React.Fragment key={Math.floor(Math.random()*14000000000)}>
                                                <Tool
                                                    _id={tool._id}
                                                    category={tool.category}
                                                    city={tool.city}
                                                    pricePerDay={tool.pricePerDay}
                                                    toolName={tool.toolName}
                                                    type={tool.type}
                                                    imgUrl={tool.imgUrl}
                                                />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </ToolsDiv>

                        </>
                    }
                </div>
            </MainBody>
        </>
    )
}

const MainBody = styled.div`

`;

const Tools = styled.div`

`;

const ToolsSpanDiv = styled.h1`

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 50px 0;
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

export default Homepage;