// src/store/reducers/chatReducer.js
const initialState = {
    conversations: [],
    selectedConversation: null,
    messages: [],
    loading: false,
    error: null,
    chatService: null,
    currentUserId: JSON.parse(localStorage.getItem('user'))?.userId // Lấy ID của user hiện tại
};
export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHAT_SERVICE':
            return {
                ...state,
                chatService: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        case 'SET_CONVERSATIONS':
            return {
                ...state,
                conversations: action.payload,
                loading: false,
                error: null
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case 'SELECT_CONVERSATION':
            return {
                ...state,
                selectedConversation: action.payload
            };
        case 'SET_MESSAGES':
            return {
                ...state,
                messages: action.payload.filter(message =>
                    message.conversationId === state.selectedConversation?.id
                )
            };

        case 'ADD_MESSAGE':
            {
                // Tạo danh sách conversations mới với tin nhắn đã cập nhật
                const updatedConversations = state.conversations.map(conv =>
                    conv.id === action.payload.conversationId
                        ? {
                            ...conv,
                            lastMessage: action.payload.content,
                            lastMessageAt: action.payload.timestamp
                        }
                        : conv
                );

                // Sắp xếp lại conversations
                const sortedConversations = sortConversations(updatedConversations);

                // Nếu tin nhắn không thuộc cuộc trò chuyện hiện tại
                if (!state.selectedConversation ||
                    action.payload.conversationId !== state.selectedConversation.id) {
                    return {
                        ...state,
                        conversations: sortedConversations
                    };
                }

                // Nếu tin nhắn thuộc cuộc trò chuyện hiện tại và chưa tồn tại
                if (!state.messages.some(msg => msg.id === action.payload.id)) {
                    return {
                        ...state,
                        messages: [...state.messages, action.payload],
                        conversations: sortedConversations
                    };
                }
                return state;
            }
        default:
            return state;
    }
};

const sortConversations = (conversations) => {
    return [...conversations].sort((a, b) => {
        const timeA = new Date(a.lastMessageAt).getTime();
        const timeB = new Date(b.lastMessageAt).getTime();
        return timeB - timeA; // Sắp xếp giảm dần theo thời gian
    });
};