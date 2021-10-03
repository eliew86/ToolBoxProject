import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Header from "./Header";

const SingleTool = () => {

    const [tool, setTool] = useState(null);
    const [status, setStatus] = useState("loading");
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState({fromDate: null, toDate: null})
    const [totalDays, setTotalDays] = useState(0);

    const user = localStorage.getItem('user');

    const { _id } = useParams();

    useEffect(() => {

        fetch(`/getTools/${_id}`)
            .then(res => res.json())
            .then(data => {
                setTool(data.data)
                setStatus('idle')
            })
    }, [])

    const onChange = (date) => {

        setDate(date);

        const actualFromDate = date[0].toDateString()
        const actualToDate = date[1].toDateString()
        const totalDaysCalc = Math.ceil((date[1]- date[0]) / (1000 * 60 * 60 * 24))

        setSelectedDate({...selectedDate, fromDate: actualFromDate, toDate: actualToDate})
        setTotalDays(Math.ceil((date[1]- date[0]) / (1000 * 60 * 60 * 24)))
        console.log("totaldays", totalDays)
        window.localStorage.setItem("fromDate", actualFromDate);
        window.localStorage.setItem("toDate", actualToDate);
        window.localStorage.setItem("totalPrice", totalDaysCalc * tool.pricePerDay)
    }
    
    
    console.log("Payment.js tool", tool)

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

                        <ToolInfoDiv>
                            <InfoTitleSpan>Late fees: </InfoTitleSpan>
                            {tool.pricePerDay * 1.5}$/day
                        </ToolInfoDiv>

                        <ToolInfoDiv>
                            <InfoTitleSpan>Total price: </InfoTitleSpan>
                            {tool.pricePerDay * totalDays}$
                        </ToolInfoDiv>
                        <BtnDiv>
                            
                            {
                                user && user != tool.ownerId ?
                                selectedDate.toDate && selectedDate.fromDate && <Btn to={`/payment/${_id}`}>Rent</Btn> :
                                <WarningDiv>
                                    <WarningSpanDiv>
                                        You must be loged in to rent tools...
                                    </WarningSpanDiv>
                                    <WarningSpanDiv>
                                        wait...ARE YOU REALLY TRYING TO RENT YOUR OWN TOOL 
                                    </WarningSpanDiv>
                                </WarningDiv>
                            }
                        </BtnDiv>
                    </ToolDiv>
                    <CalendarDiv>
                        <Calendar
                            showWeekNumbers
                            selectRange={true}
                            onChange={onChange}
                        />
                    </CalendarDiv>
                </ToolInfo>
            }
            
        </>
    )
}

const ToolInfo = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const ToolDiv = styled.div`

    display: flex;
    flex-direction: column;
    padding: 30px;
    border: solid 8px;
    border-image: linear-gradient(to top, black, #ff7366)1;
    border-radius: 5px;
    margin: 0 25px 0 100px;
    width: 200px;
    align-items: center;
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

const WarningSpanDiv = styled.div`

    font-size: 15px;
    text-decoration: underline;
    margin-bottom: 10px;
`;

const WarningDiv = styled.div`


`;

const CalendarDiv = styled.div`

    margin-left: 100px;
`;

export default SingleTool;