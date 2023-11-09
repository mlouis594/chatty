import "../css/ChatList.css";
import ChatCard from "./ChatCard";
export default function ChatList() {
  const temp = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  return (
    <>
      <h2 className="chat-list-header">Messages</h2>
      <div className="chat-list">
        {temp.map(() => (
          <ChatCard />
        ))}
      </div>
    </>
  );
}
