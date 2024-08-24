/* eslint-disable react/prop-types */
import { extractTime } from "../../../../backend/utils/extractTime.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.id;
  const className =fromMe ? "chat-end" : "chat-start"; 
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${className}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile Picture" src={profilePic} />
        </div>
      </div>
      {/* <div className="chat-header">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50">12:45</time>
      </div> */}
      <div className={`chat-bubble text-white ${fromMe && "bg-blue-500"} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
