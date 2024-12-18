import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { authApi } from '../../api';
import { use } from 'react';
import { set } from 'lodash';
import { FriendList } from './FriendList';
import { Link } from 'react-router-dom';

const FriendsTab = () => {
    // Mock data for friend suggestions and requests
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sentRequests, setSentRequests] = useState(new Set());


    const [friendRequests, setFriendRequests] = useState([]
    );
    useEffect(() => {
        fetchSuggestions();
    }, []);

    const fetchSuggestions = async () => {
        try {
            setLoading(true);
            const response = await authApi.getFriendSuggestions();
            const formattedSuggestions = response.suggestions.map(suggestion => ({
                ...suggestion,
                avatarUrl: suggestion.avatarUrl?.startsWith('/files')
                    ? `${BASE_URL}${suggestion.avatarUrl}`
                    : suggestion.avatarUrl || 'https://via.placeholder.com/150'
            }));
            setSuggestions(formattedSuggestions);
        } catch (err) {
            setError('Failed to load friend suggestions');
            console.error('Error fetching suggestions:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const requests = await authApi.getFriendRequests()
            var friendRequests = []
            requests.map((request) => (
                friendRequests.push({
                    id: request.sourceUserId,
                    name: faker.person.fullName(),
                    avatar: faker.image.avatar(),
                    mutualFriends: Math.floor(Math.random() * 20),
                })
            ))
            setFriendRequests(friendRequests)
        }
        fetchApi();
    }, []);
    // Handle friend request actions
    const handleSendRequest = async (userId) => {
        try {
            await authApi.sendFriendRequest(userId);
            setSentRequests(prev => new Set(prev).add(userId));
        } catch (err) {
            console.error('Error sending friend request:', err);
        }
    };

    const handleAcceptRequest = (id) => {
        authApi.acceptFriendRequest(id)
        setFriendRequests(friendRequests.filter((request) => request.id !== id))
        alert('Đã chấp nhận lời mời kết bạn')
        console.log('Accepting friend request from:', id);
    };

    const handleRejectRequest = (id) => {
        authApi.rejectFriendRequest(id)
        setFriendRequests(friendRequests.filter((request) => request.id !== id))
        console.log('Rejecting friend request from:', id);
    };
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex justify-center my-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="text-red-500 text-center my-8">{error}</div>
            </div>
        );
    }
    return (
        <div className="max-w-4xl mx-auto p-4 bg-[#f7f7f7] dark:bg-[#18191a] min-h-[100vh]">
            {/* Friend Requests Section */}
            {friendRequests.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Lời mời kết bạn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {friendRequests.map((request) => (
                            <div key={request.id} className="bg-white dark:bg-[#28282B] rounded-lg shadow p-4 flex items-center space-x-4">
                                <img src={request.avatar} alt={request.name} className="w-16 h-16 rounded-full" />
                                <div className="flex-1">
                                    <Link to={`/profile/${request.id}`}>
                                        <h3 className="font-semibold dark:text-white">{request.name}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{request.mutualFriends} bạn chung</p>
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            onClick={() => handleAcceptRequest(request.id)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                        >
                                            Chấp nhận
                                        </button>
                                        <button
                                            onClick={() => handleRejectRequest(request.id)}
                                            className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Friend Suggestions Section */}
            <div>
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Gợi ý kết bạn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestions.map((suggestion) => (
                        <div key={suggestion?.userId} className="bg-white dark:bg-[#28282B] rounded-lg shadow p-4">
                            <div className="flex items-center space-x-4">
                                <img src={suggestion.avatarUrl} alt={suggestion?.fullName || ""} className="w-16 h-16 rounded-full" />
                                <div className="flex-1">
                                    <Link to={`/profile/${suggestion.userId}`}>
                                        <h3 className="font-semibold dark:text-white">{suggestion.fullName}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.mutualFriends} bạn chung</p>
                                    <button
                                        onClick={() => handleSendRequest(suggestion.userId)}
                                        disabled={sentRequests.has(suggestion.userId)}
                                        className={`mt-2 w-full rounded-md px-4 py-1.5 text-sm font-semibold 
                                        ${sentRequests.has(suggestion.userId)
                                                ? 'bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                                : 'bg-blue-500 text-white hover:bg-blue-600 transition-colors'
                                            }`}
                                    >
                                        {sentRequests.has(suggestion.userId) ? 'Đã gửi lời mời' : 'Thêm bạn bè'}

                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <FriendList />
        </div>
    );
};

export default FriendsTab;