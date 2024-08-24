import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

export default function useGetMessages() {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        const getMessages = async() => {
            setLoading(true);
            try {
                const res = fetch('/api/messages')
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        return () => {
            
        };
    }, []);
  return (
    <div>useGetMessages</div>
  )
}
