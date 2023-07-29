import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Socket } from "socket.io-client";

interface ChatProps {
  socket: Socket;
  chatId: string;
  sender: string;
  //chatMembers: [string];
  chatContents: {
    sender: string;
    messageTime: number;
    messageContents: string;
  }[];
}

export default function Chat({
  socket,
  chatId,
  sender,
  //chatMembers,
  chatContents,
}: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState("");

  //need to load the previous messages

  //also need to query all the user's chat info and load them

  const sendMessage = async () => {
    if (currentMessage != "") {
      const messageData = {
        chatId: chatId,
        //chatMembers: chatMembers,
        sender: sender,
        message: currentMessage,
        messageTime: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };
      await socket.emit("send-message", messageData);
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <p>Chat Name</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type Message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={() => sendMessage()}>SEND</button>
      </div>
    </div>
  );
}
