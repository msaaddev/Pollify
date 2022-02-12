import React, { useEffect, useState } from "react";

function Chat(props) {
    const { socket, username, receiver } = props;
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (currentMessage) {
            const time = new Date();
            const messageData = {
                receiver: receiver,
                username: username,
                message: currentMessage,
                time:
                    `${time.getHours()}:${time.getMinutes()}`
            };

            await socket.emit("send_message", messageData);
            setMessages((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div>
            <div>
                <p>Chatbox</p>
            </div>
            <div>
                {messages.map((msg) => {
                    return (
                        <div>
                            <div>
                                <div >
                                    <p>{msg.message}</p>
                                </div>
                                <div >
                                    <p id="time">{msg.time}  <span>{msg.username === username ? "you" : msg.username}</span></p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div >
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;