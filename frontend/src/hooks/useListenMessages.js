import { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext.jsx';
import useConversation  from '../zustand/useConversation.js';


export default function useListenMessages() {
  const {socket} = useSocketContext()
  const {messages, setMessages} = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        setMessages([...messages, newMessage]);
    })

    return () => socket?.off("newMessage"); 
  }, [socket,setMessages,messages])
}
