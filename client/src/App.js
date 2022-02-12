import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const client_socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [showChat, setShowChat] = useState(false);

  const startChat = () => {
    if (username && receiver) {
      client_socket.emit("start_chat", receiver);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div>
          <h3>Join</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Whom to connect..."
            onChange={(event) => {
              setReceiver(event.target.value);
            }}
          />
          <button onClick={startChat}>Chat</button>
        </div>
      ) : (
        <Chat socket={client_socket} username={username} receiver={receiver} />
      )}
    </div>
  );
}

export default App;