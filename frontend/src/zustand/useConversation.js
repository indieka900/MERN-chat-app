import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    message: [],
    setMessages: (message) => set({message}),
}))

export default useConversation;