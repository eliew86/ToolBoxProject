import React, {useEffect, useRef, useState} from "react";
import TextField from "@material-ui/core/TextField"
import styled from "styled-components";
import io from "socket.io-client";
import Header from "./Header";
import "./Chat.css"
import ChatComm from "./ChatComm";

const socket = io.connect("http://localhost:4000")


// const socket = io.connect("http://localhost:4000")
const Chat = () => {
	const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [showChat, setShowChat] = useState(false);
	
    const joinRoom = () => {

        if(username !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true);
        }
    }

	return (
        <>
            <Header />
            <Wrapper>
                <div className="App">
                    {!showChat ? (
                    <div className="joinChatContainer">
                        <h3>Join a Chat</h3>
                        <input 
                            type="text" 
                            placeholder="Name..."
                            onChange={(event) => {setUsername(event.target.value)}}
                        />
                        <input 
                            type="text" 
                            placeholder="Room ID..."
                            onChange={(event) => {setRoom(event.target.value)}}
                        />
                        <button onClick={joinRoom}>Join a Room</button>
                    </div>
                    )
                    : (
                        <ChatComm 
                            socket={socket}
                            username={username}
                            room={room}
                        />
                    )}
                    </div>

            </Wrapper>
        </>
	)
}

const Wrapper = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default Chat;