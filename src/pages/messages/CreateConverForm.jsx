import { useState, useEffect } from 'react';
import { Search, X, Users, Check } from 'lucide-react';
import { profileApi } from '../../api';

export default function CreateConversationDialog({ open, onClose, onCreateConversation }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (search.trim()) {
                setLoading(true);
                try {
                    const response = await profileApi.search(search);
                    const uid = JSON.parse(localStorage.getItem('user')).userId;
                    setSearchResults(response.filter(user => user.id !== uid));
                } catch (error) {
                    console.error('Search error:', error);
                }
                setLoading(false);
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const handleSelectUser = (user) => {
        if (!selectedUsers.find(u => u.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
    };

    const handleCreateConversation = async () => {
        if (selectedUsers.length === 0) return;

        try {
            const participantIds = selectedUsers.map(u => u.id);
            await onCreateConversation(participantIds);
            onClose();
            setSelectedUsers([]);
            setSearch('');
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white">Tạo cuộc trò chuyện mới</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bạn bè..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedUsers.map(user => (
                            <div key={user.id} className="flex items-center bg-blue-100 dark:bg-blue-800 rounded-full px-3 py-1">
                                <span className="text-sm text-blue-800 dark:text-blue-100">{user.name}</span>
                                <button
                                    onClick={() => handleRemoveUser(user.id)}
                                    className="ml-2 text-blue-800 dark:text-blue-100 hover:text-blue-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="max-h-60 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        searchResults?.map(user => (
                            <div
                                key={user.id}
                                onClick={() => handleSelectUser(user)}
                                className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                            >
                                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                                <span className="ml-3 text-gray-800 dark:text-gray-200">{user.name}</span>
                                {selectedUsers.find(u => u.id === user.id) && (
                                    <Check className="ml-auto w-5 h-5 text-blue-500" />
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleCreateConversation}
                        disabled={selectedUsers.length === 0}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <Users className="w-5 h-5 mr-2" />
                        Tạo cuộc trò chuyện
                    </button>
                </div>
            </div>
        </div>
    );
}