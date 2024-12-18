// src/store/actions/chatActions.js
export const chatActions = {
    setChatService: (service) => ({
        type: 'SET_CHAT_SERVICE',
        payload: service
    }),

    setLoading: (isLoading) => ({
        type: 'SET_LOADING',
        payload: isLoading
    }),

    setConversations: (conversations) => ({
        type: 'SET_CONVERSATIONS',
        payload: conversations
    }),

    setError: (error) => ({
        type: 'SET_ERROR',
        payload: error
    }),

    selectConversation: (conversation) => ({
        type: 'SELECT_CONVERSATION',
        payload: conversation
    }),

    setMessages: (messages) => ({
        type: 'SET_MESSAGES',
        payload: messages
    }),

    addMessage: (message) => ({
        type: 'ADD_MESSAGE',
        payload: {
            ...message,
            timestamp: message?.createdAt || new Date().toISOString()
        }
    }),

    updateConversationList: () => async (dispatch, getState) => {
        const { chatService } = getState().chat;
        if (!chatService) return;

        try {
            const conversations = await chatService.getConversations();
            dispatch(chatActions.setConversations(conversations));
        } catch (error) {
            console.error('Error updating conversations:', error);
        }
    }


};