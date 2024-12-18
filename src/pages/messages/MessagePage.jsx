// src/pages/messages/MessagePage.jsx
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Search,
    MoreHorizontal,
    Plus,
    ThumbsUp,
    Send,
    MoreHorizontalIcon,
    MessageSquarePlus
} from 'lucide-react';
import { ChatService } from '../../services/messageService';
import { chatActions } from '../../store/actions/chatActions';
import CreateConversationDialog from './CreateConverForm';
import { messageApi } from '../../api';


function MessagePage() {
    const dispatch = useDispatch();
    const {
        conversations,
        selectedConversation,
        messages,
        loading,
        error,
        chatService,
        currentUserId
    } = useSelector(state => state.chat);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    // Initialize chat service
    useEffect(() => {
        const service = new ChatService();
        service.start().then(() => {
            service.onReceiveMessage((message) => {
                dispatch(chatActions.addMessage(message));

                // Nếu tin nhắn không thuộc cuộc trò chuyện hiện tại,
                // cập nhật danh sách cuộc trò chuyện để hiển thị tin nhắn mới nhất
                if (!selectedConversation || message.conversationId !== selectedConversation.id) {
                    dispatch(chatActions.updateConversationList());
                }
            });
            dispatch(chatActions.setChatService(service));
        });
    }, [dispatch]);

    // Load conversations
    useEffect(() => {
        const loadConversations = async () => {
            if (!chatService) return;

            dispatch(chatActions.setLoading(true));
            try {
                const data = await chatService.getConversations();
                dispatch(chatActions.setConversations(data));
            } catch (error) {
                dispatch(chatActions.setError(error.message));
            }
        };

        loadConversations();
    }, [chatService, dispatch]);

    // Load messages when conversation is selected
    useEffect(() => {
        const loadMessages = async () => {
            if (!chatService || !selectedConversation) return;

            try {
                const data = await chatService.getMessages(selectedConversation.id);
                dispatch(chatActions.setMessages(data));
            } catch (error) {
                console.error('Error loading messages:', error);
            }
        };

        loadMessages();
    }, [selectedConversation, chatService, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleContactClick = (conversation) => {
        dispatch(chatActions.selectConversation(conversation));
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!inputText.trim() || !selectedConversation || !chatService) return;

        try {
            await chatService.sendMessage(selectedConversation.id, inputText.trim());
            setInputText("");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const onCreateConversation = async (participantIds) => {
        if (!chatService) return;
        var newConv = await messageApi.createConversation(participantIds);
        if (!newConv) return;
        dispatch(chatActions.addConversation(newConv));
        dispatch(chatActions.selectConversation(newConv));
    };

    // Rest of your component rendering code remains the same...
    return (
        <div className="flex h-[calc(100vh-60px)] bg-white dark:bg-[#18191a]">
            <CreateConversationDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onCreateConversation={onCreateConversation}
            />
            {/* Left sidebar */}
            <div className="w-[360px] border-r border-gray-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-xl font-semibold">Đoạn chat</h1>
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="ml-auto p-2 hover:bg-gray-100 rounded-full text-blue-500 dark:hover:bg-gray-700"
                        >
                            <MessageSquarePlus className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700">
                            <MoreHorizontalIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    <div className="mt-2 relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên Messenger"
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none dark:bg-[#28282B]"
                        />
                    </div>
                </div>

                {/* Conversation list */}
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => handleContactClick(conversation)}
                            className={`flex items-center px-3 py-2 cursor-pointer ${conversation.id === selectedConversation?.id
                                ? "bg-blue-100 dark:bg-blue-800" // Màu nền khác khi được chọn
                                : "hover:bg-gray-100 dark:hover:bg-[#28282B]" // Màu nền khi hover
                                }`}
                        >
                            <img
                                src={conversation.participants[0]?.avatar || '/default-avatar.png'}
                                alt="Avatar"
                                className="w-14 h-14 rounded-full flex-shrink-0"
                            />
                            <div className="ml-3 flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {conversation.participants?.length === 1
                                            ? conversation.participants[0].username
                                            : conversation.participants?.map(p => p.username.split(' ').pop()).join(', ') || conversation.id.slice(0, 8)}
                                    </h3>
                                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                        {new Date(conversation.lastMessageAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                    {conversation.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#18191a]">
                {selectedConversation && (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map((message) => {
                                const sender = selectedConversation.participants.find(
                                    (participant) => participant.id === message.senderId
                                );

                                return (
                                    <div
                                        key={message.id}
                                        className={`flex items-start mb-4 ${message.senderId === currentUserId ? 'justify-end' : ''
                                            }`}
                                    >
                                        {message.senderId !== currentUserId && (
                                            <img
                                                src={sender?.avatar || '/default-avatar.png'}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full flex-shrink-0"
                                            />
                                        )}
                                        <div
                                            className={`ml-2 rounded-2xl px-4 py-2 max-w-md ${message.senderId === currentUserId
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 dark:bg-gray-500'
                                                }`}
                                        >
                                            <p>{message.content}</p>
                                        </div>
                                        <div ref={messagesEndRef} />
                                    </div>
                                );

                            })}
                        </div>

                        {/* Input area */}
                        <div className="border-t border-gray-200 p-3 bg-white dark:bg-[#18191a]">
                            <div className="flex items-center bg-white rounded-full dark:bg-[#3d3d42d4]">
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Aa"
                                    value={inputText}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    className="flex-1 mx-4 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none dark:bg-[#6b6b73]"
                                />
                                <button
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                    onClick={handleSendMessage}
                                >
                                    {inputText.trim() ? (
                                        <Send className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <ThumbsUp className="w-5 h-5 text-blue-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}

export default MessagePage;