import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import { GrPlayFill } from "react-icons/gr";

const ChatComm = ({socket, username, room}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // sends the data to the backend so the message can be displayed to the users in the chat room
    const sendMessage = async () => {

        if(currentMessage !== "") {
            const messageData = {

                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {

        // sets the message when receive_message has been pinged
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        })
    }, [socket]);

    return (

        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {/* ScrollBottom prevents the msessages to go outside of the message-content div and gives us the ability to scroll */}
                <ScrollToBottom className="message-container">

                    {/* maps through all the messages to filter each ones user and display them right */}
                    {messageList.map((messageContent) => {

                        return <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                    
                                    <div>
                                        <div className="message-content">
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{messageContent.time}</p>
                                            <p id="author">{messageContent.author}</p>
                                        </div>
                                    </div>
                                </div>;
                    })}
                </ScrollToBottom>
            </div>
            {/* sets the input and send button for the user to type and send messages */}
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={currentMessage}
                    placeholder="Message..."
                    onChange={(event) => {setCurrentMessage(event.target.value)}}
                    onKeyPress={(event) => {event.key === "Enter" && sendMessage()}}
                />
                <button onClick={sendMessage} classNam="send"><GrPlayFill /></button>
            </div>
        </div>
    )
}

export default ChatComm;
