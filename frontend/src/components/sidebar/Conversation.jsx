/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../zustand/useConversation.js";

function Conversation({ conversation, emoji, lastIdx }) {
  const { selectedConversation, setSelectedConversation, conversations } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const lastMessage = conversations[conversation._id]?.lastMessage;

  console.log(lastMessage);
  

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
          {/* <div className="flex justify-between">
            <p className="text-sm text-gray-300 truncate">
              {lastMessage?.text || "No messages yet"}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-300">
                {formatTime(lastMessage.createdAt)}
              </p>
            )}
          </div> */}
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}

export default Conversation;
