import React, { useEffect, useState } from 'react';
import { authApi } from '../../api';
import { BASE_URL } from '../../api';
import { Link } from 'react-router-dom';

export const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUnfriendConfirm, setShowUnfriendConfirm] = useState(null);

    useEffect(() => {
        fetchFriends();
    }, []);

    const fetchFriends = async () => {
        try {
            setLoading(true);
            const response = await authApi.getFriends();
            // Adjust avatar URLs
            const formattedFriends = response.map(friend => ({
                ...friend,
                avatarUrl: friend?.profile.profilePictureUrl?.startsWith('/files')
                    ? `${BASE_URL}${friend.profile.profilePictureUrl}`
                    : friend.profile.profilePictureUrl || 'https://via.placeholder.com/150'
            }));
            setFriends(formattedFriends);
        } catch (err) {
            setError('Failed to load friends');
            console.error('Error fetching friends:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUnfriend = async (friendId) => {
        try {
            // Call your unfriend API here
            await authApi.rejectFriendRequest(friendId);
            // Remove friend from local state
            setFriends(friends.filter(friend => friend.id !== friendId));
            setShowUnfriendConfirm(null);
        } catch (err) {
            console.error('Error removing friend:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center my-8">{error}</div>
        );
    }

    return (
        <div className="mt-8 bg-white dark:bg-[#18191a] p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Bạn bè ({friends.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {friends.map((friend) => (
                    <div
                        key={friend.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#28282B] rounded-lg"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={friend.avatarUrl}
                                alt={friend.fullName}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <Link to={`/profile/${friend.id}`}>
                                    <h3 className="font-semibold dark:text-white">{friend?.profile?.fullName}</h3>
                                </Link>
                                <p className="text-sm text-gray-500 dark:text-gray-400">@{friend.username}</p>
                                {friend.location && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{friend.location}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            {showUnfriendConfirm === friend.id ? (
                                <div className="absolute right-0 bottom-0 mb-12 w-48 bg-white dark:bg-[#3a3b3c] shadow-lg rounded-lg p-4 z-10">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                        Bạn chắc chắn muốn hủy kết bạn với {friend.fullName}?
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setShowUnfriendConfirm(null)}
                                            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={() => handleUnfriend(friend.id)}
                                            className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowUnfriendConfirm(friend.id)}
                                    className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 text-sm font-medium"
                                >
                                    Hủy kết bạn
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {friends.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Bạn chưa có người bạn nào
                </div>
            )}
        </div>
    );
};