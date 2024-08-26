import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
    conversations: {},
    updateConversation: (conversationId, lastMessage) => set((state) => ({
        conversations: {
            ...state.conversations,
            [conversationId]: {
                ...state.conversations[conversationId],
                lastMessage
            }
        }
    })),
}));

export default useConversation;