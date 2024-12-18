// src/services/chatService.js
import { HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr';
import { BASE_URL, getAuthHeader } from '../api';

export class ChatService {
    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl(BASE_URL + '/chat', {
                withCredentials: false,  // Thay đổi thành false
                headers: {
                    "Authorization": localStorage.getItem('token') // Nếu cần
                },
                accessTokenFactory: () => localStorage.getItem('token')
            }) // Through API Gateway
            .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Retry intervals
            .configureLogging(LogLevel.Information)
            .build();
        this.isStarting = false;
        this.startPromise = null;

        // Setup connection event handlers
        this.connection.onclose(async () => {
            console.log('Connection closed');
            this.startPromise = null;
        });

        this.connection.on("ReceiveMessage", (message) => {
            if (this.messageHandler) {
                this.messageHandler(message);
            }
        });
    }


    async ensureConnection() {
        if (this.connection.state === HubConnectionState.Connected) {
            return;
        }

        if (this.isConnecting) {
            return this.connectionPromise;
        }

        this.isConnecting = true;
        this.connectionPromise = this.start();

        try {
            await this.connectionPromise;
        } finally {
            this.isConnecting = false;
        }
    }

    async start() {
        // If already connected, return immediately
        if (this.connection.state === HubConnectionState.Connected) {
            return;
        }

        // If currently trying to connect, wait for that attempt
        if (this.isStarting) {
            return this.startPromise;
        }

        // If connection is not in Disconnected state, stop it first
        if (this.connection.state !== HubConnectionState.Disconnected) {
            await this.connection.stop();
        }

        this.isStarting = true;
        this.startPromise = new Promise(async (resolve, reject) => {
            try {
                await this.connection.start();
                console.log('Successfully connected to hub');
                this.isStarting = false;
                resolve();
            } catch (err) {
                console.error('Error connecting to hub:', err);
                this.isStarting = false;
                reject(err);
            }
        });

        return this.startPromise;
    }

    onReceiveMessage(handler) {
        this.messageHandler = handler;
    }

    async sendMessage(conversationId, content) {
        if (this.connection.state !== HubConnectionState.Connected) {
            try {
                await this.start();
            } catch (err) {
                console.error('Failed to establish connection:', err);
                throw new Error('Could not establish connection');
            }
        }

        // Double check connection state before sending
        if (this.connection.state !== HubConnectionState.Connected) {
            throw new Error('Connection is not established');
        }

        try {
            await this.connection.invoke("SendMessage", conversationId, content);
        } catch (err) {
            console.error('Error sending message:', err);
            throw err;
        }
    }

    async getConversations() {
        const response = await fetch(BASE_URL + '/api/messages/conversations', getAuthHeader());
        if (!response.ok) {
            throw new Error('Failed to fetch conversations');
        }
        return response.json();
    }

    async getMessages(conversationId) {
        const response = await fetch(BASE_URL + `/api/messages/conversations/${conversationId}/messages`, getAuthHeader());
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        return response.json();
    }

    async createConversation(participantIds) {
        const response = await fetch(BASE_URL + '/api/messages/conversations', {
            method: 'POST', headers: getAuthHeader(),
            body: JSON.stringify(participantIds)
        });
        if (!response.ok) {
            throw new Error('Failed to create conversation');
        }
        return response.json();
    }
}