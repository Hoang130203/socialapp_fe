import axios from 'axios';

export const BASE_URL = 'http://localhost:4070';

export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        // withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : '',
        },
        "Access-Control-Allow-Origin": "*",
    };
};
const getAuthHeaderFormData = () => {
    const token = localStorage.getItem('token');
    return {
        // withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": token ? `Bearer ${token}` : '',
        },
        "Access-Control-Allow-Origin": "*",
    };
}
const baseHeader = {
    headers: {
        "Content-Type": "application/json",
    },
    "Access-Control-Allow-Origin": "*",
};

// Auth API endpoints
export const authApi = {
    login: async (username, password) => {
        try {
            const data = {
                LoginRequest: {
                    Username: username,
                    Password: password
                }
            };
            const response = await axios.post(`${BASE_URL}/auth/users/login`, data, baseHeader);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (email, username, password, fullName, userType) => {
        try {
            const data = {
                RegisterRequest: {
                    Email: email,
                    Username: username,
                    Password: password,
                    FullName: fullName,
                    UserType: 1
                }
            };
            const response = await axios.post(`${BASE_URL}/auth/users/register`, data, baseHeader);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Group Management
    createGroup: async (name, description, visibility) => {
        try {
            const data = {
                name,
                description,
                visibility // 0 for Public, 1 for Private
            };
            const response = await axios.post(`${BASE_URL}/auth/group`, data, getAuthHeader());
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateGroup: async (groupId, name, description, visibility) => {
        try {
            const data = {
                name,
                description,
                visibility
            };
            const response = await axios.put(`${BASE_URL}/auth/group/${groupId}`, data, getAuthHeader());
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Friend Management
    sendFriendRequest: async (targetUserId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/user/send-friend-request/${targetUserId}`,
                {},
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFriendRequests: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/user/friend-requests`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    acceptFriendRequest: async (requesterId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/user/accept-friend-request/${requesterId}`,
                {},
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getFriendSuggestions: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/user/suggestions`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    rejectFriendRequest: async (requesterId) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/auth/user/reject-friend-request/${requesterId}`,
                {},
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFriends: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/user/friends`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserGroups: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/user/groups`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUserCreatedGroups: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/user/createdGroups`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

// Profile API endpoints
export const profileApi = {
    getProfileById: async (userId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/profiles/UserProfile/${userId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    search: async (search) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/profiles/subinfo/search?name=${search}`,
                getAuthHeader()
            );
            return response.data;
        }
        catch (error) {
            throw error;
        }
    },
    updateAvatar: async (avatarUrl) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/profiles/UserProfile/avatar`,
                JSON.stringify(avatarUrl),
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBackground: async (backgroundUrl) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/profiles/UserProfile/background`,
                JSON.stringify(backgroundUrl),
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllProfiles: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/profiles/UserProfile/userProfiles`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getGroupInfo: async (groupId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/profiles/groupinfo/${groupId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateGroupImage: async (groupId, imageUrl) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/profiles/groupinfo/${groupId}/groupPicture`,
                JSON.stringify(imageUrl),
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateGroupBackground: async (groupId, backgroundUrl) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/profiles/groupinfo/${groupId}/groupBackground`,
                JSON.stringify(backgroundUrl),
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// Post API endpoints
export const postApi = {
    createPost: async (postData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/posts`,
                postData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createGroupPost: async (groupId, postData) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/posts/group/${groupId}`,
                postData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPost: async (postId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/posts/${postId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getFeed: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/posts/feed`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getWatchlist: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/posts/videos?page=1`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

// Group Permissions API
export const groupPermissionsApi = {
    getGroupRoles: async (groupId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/auth/grouppermissions/group/${groupId}/roles`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateGroupRoles: async (groupId, roleData) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/auth/grouppermissions/group/${groupId}/roles`,
                roleData,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

//file upload
export const fileUploadApi = {
    uploadFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                `${BASE_URL}/api/files/upload`,
                formData,
                getAuthHeaderFormData()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
//mesasge api
export const messageApi = {
    getConversations: async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/messages/conversations`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getMessages: async (conversationId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/messages/conversations/${conversationId}/messages`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createConversation: async (participantIds) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/messages/conversations`,
                participantIds,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    sendMessage: async (conversationId, content) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/messages/conversations/${conversationId}/messages`,
                content,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};