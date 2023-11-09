import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Socket } from "socket.io-client";
import ChatCard from "./ChatCard";

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
  const temp = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

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
    <>
      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search"></i>
          </div>
          <div className="list">
            {temp.map(() => (
              <ChatCard />
            ))}
          </div>
        </div>

        <div className="chat">
          <div className="chat-header clearfix">
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
              alt="avatar"
            />

            <div className="chat-about">
              <div className="chat-with">Chat with Vincent Porter</div>
              <div className="chat-num-messages">already 1 902 messages</div>
            </div>
            <i className="fa fa-star"></i>
          </div>

          <div className="chat-history">
            <ul>
              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Olia</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name">
                    <i className="fa fa-circle online"></i> Vincent
                  </span>
                  <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message">
                  Are we meeting today? Project has been already finished and I
                  have results to show you.
                </div>
              </li>

              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time">10:14 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">Olia</span>{" "}
                  <i className="fa fa-circle me"></i>
                </div>
                <div className="message other-message float-right">
                  Well I am not sure. The rest of the team is not here yet.
                  Maybe in an hour or so? Have you faced any problems at the
                  last phase of the project?
                </div>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name">
                    <i className="fa fa-circle online"></i> Vincent
                  </span>
                  <span className="message-data-time">10:20 AM, Today</span>
                </div>
                <div className="message my-message">
                  Actually everything was fine. I'm very excited to show this to
                  our team.
                </div>
              </li>

              <li>
                <div className="message-data">
                  <span className="message-data-name">
                    <i className="fa fa-circle online"></i> Vincent
                  </span>
                  <span className="message-data-time">10:31 AM, Today</span>
                </div>
                <i className="fa fa-circle online"></i>
                <i className="fa fa-circle online"></i>
                <i className="fa fa-circle online"></i>
              </li>
            </ul>
          </div>

          <div className="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows={3}
            ></textarea>
            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
            <i className="fa fa-file-image-o"></i>
            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
