import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useHistory, useParams, Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SingleTool = () => {

    const [tool, setTool] = useState(null);
    const [status, setStatus] = useState("loading");
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState({fromDate: null, toDate: null})

    let history = useHistory();
    const user = localStorage.getItem('user');

    const { _id } = useParams();

    const onChange = (date) => {

        setDate(date);

        const actualFromDate = date[0].toDateString()
        const actualToDate = date[1].toDateString()
        window.localStorage.setItem("fromDate", actualFromDate);
        window.localStorage.setItem("toDate", actualToDate);
        setSelectedDate({...selectedDate, fromDate: actualFromDate, toDate: actualToDate})

        console.log("date 0", actualFromDate)
        console.log("date 1", actualToDate)
    }

    useEffect(() => {

        fetch(`/getTools/${_id}`)
            .then(res => res.json())
            .then(data => {
                setTool(data.data)
                setStatus('idle')
            })
    }, [])

    return (
        <>
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
                            {
                                user ?
                                selectedDate.toDate && selectedDate.fromDate && <Btn to={`/payment/${_id}`}>Rent</Btn> :
                                <WarningSpan>
                                    You must be loged in to rent tools
                                </WarningSpan>
                            }
                        </BtnDiv>
                    </ToolDiv>
                    <CalendarDiv>
                        <Calendar
                            showWeekNumbers
                            selectRange={true}
                            onChange={onChange}
                        />
                        {console.log("date", Math.ceil((date[1]- date[0]) / (1000 * 60 * 60 * 24)))}
                    </CalendarDiv>
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

const WarningSpan = styled.span`

    font-size: 15px;
    text-decoration: underline;
`;

const CalendarDiv = styled.div`

    margin-left: 100px;
`;

export default SingleTool;