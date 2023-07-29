import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import "../css/Home.css";
import Navbar from "./Navbar";
import ChatList from "./ChatList";
import Chat from "./Chat";
import Cookies from "js-cookie";

const socket = io("http://localhost:5001");

export default function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();

  //when the dependency array is empty the function in the useEffect will only run when the component is mounted and unmounted
  //will run the first function when mounted and the return function when unmounted
  //typically state variables go in the dependency array
  useEffect(() => {
    console.log("mount");
    if (!Cookies.get("token")) {
      navigate("/login");
    } else {
      socket.connect();
    }
    return () => {
      console.log("Cleanup");
    };
  }, []);

  //this function will be called when a chat is selected
  const beginChat = () => {
    //this will be called when a chat is selected from the sidebar
    let chatId = "";
    //the chatID from the DB will be sent with the emit
    //not sure if await is needed
    socket.emit("begin-chat", chatId);
  };

  return (
    <>
      <Navbar />
      <ChatList />
      <Chat
        socket={socket}
        chatId="1"
        sender={state.fullName}
        chatContents={[]}
      />
    </>
  );
}
