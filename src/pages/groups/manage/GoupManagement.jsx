import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL, fileUploadApi, groupPermissionsApi, profileApi } from '../../../api';
import { Switch } from '@mui/material';
import { CameraIcon } from 'lucide-react';

const GroupManagement = () => {
    const { id: groupId } = useParams();
    const [roles, setRoles] = useState([]);
    const [groupInfo, setGroupInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [isHoveringCover, setIsHoveringCover] = useState(false);
    const [isHoveringProfile, setIsHoveringProfile] = useState(false);

    const roleNames = {
        0: 'Creator',
        1: 'Admin',
        2: 'Moderator',
        3: 'Member',
        4: 'Visitor',
        5: 'Banned'
    };


    useEffect(() => {
        Promise.all([
            fetchGroupRoles(),
            fetchGroupInfo()
        ]);
    }, [groupId]);

    const fetchGroupInfo = async () => {
        try {
            const response = await profileApi.getGroupInfo(groupId);
            if (response?.groupPictureUrl?.startsWith("/files")) {
                response.groupPictureUrl = `${BASE_URL}${response.groupPictureUrl}`;
            }
            if (response?.groupBackgroundUrl?.startsWith("/files")) {
                response.groupBackgroundUrl = `${BASE_URL}${response.groupBackgroundUrl}`;
            }
            setGroupInfo(response);
        } catch (err) {
            console.error('Error fetching group info:', err);
        }
    };

    const handleImageUpdate = async (file, type) => {
        try {
            setSaving(true);
            const fileUrl = await fileUploadApi.uploadFile(file);

            // Update group image
            if (type === 'picture') {
                await profileApi.updateGroupImage(groupId, fileUrl?.startsWith("/files") ? `${BASE_URL}${fileUrl}` : fileUrl);
            } else {
                await profileApi.updateGroupBackground(groupId, fileUrl?.startsWith("/files") ? `${BASE_URL}${fileUrl}` : fileUrl);
            }

            // Refresh group info
            await fetchGroupInfo();
        } catch (err) {
            console.error('Error updating image:', err);
        } finally {
            setSaving(false);
        }
    };

    const fetchGroupRoles = async () => {
        try {
            setLoading(true);
            const response = await groupPermissionsApi.getGroupRoles(groupId);
            setRoles(response.rolePermissions);
        } catch (err) {
            setError('Failed to load group roles');
            console.error('Error fetching roles:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePermissionToggle = async (roleGroupId, permissionId, currentValue) => {
        // Prepare the update payload
        const updateData = {
            roleGroupId: roleGroupId,
            permissions: [{
                permissionId: permissionId,
                isAllowed: !currentValue
            }]
        };

        try {
            setSaving(true);
            await groupPermissionsApi.updateGroupRoles(groupId, updateData);

            // Update local state after successful API call
            setRoles(prevRoles => prevRoles.map(role => {
                if (role.roleGroupId === roleGroupId) {
                    return {
                        ...role,
                        permissions: role.permissions.map(perm => {
                            if (perm.id === permissionId) {
                                return { ...perm, isAllowed: !currentValue };
                            }
                            return perm;
                        })
                    };
                }
                return role;
            }));
        } catch (err) {
            console.error('Error updating permission:', err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-[#18191a] min-h-screen">
            <div className="relative h-[28.75rem] max-h-[28.75rem] w-full">
                <div
                    className="relative h-[28.75rem] w-full"
                    style={{
                        backgroundImage: `url('${groupInfo?.groupBackgroundUrl || 'https://via.placeholder.com/1920x400'}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onMouseEnter={() => setIsHoveringCover(true)}
                    onMouseLeave={() => setIsHoveringCover(false)}
                >
                    {isHoveringCover && (
                        <div className="absolute bottom-4 right-4">
                            <label className="cursor-pointer bg-white bg-opacity-90 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-100">
                                <CameraIcon className="h-5 w-5" />
                                <span>Thay đổi ảnh bìa</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpdate(e.target.files[0], 'background')}
                                />
                            </label>
                        </div>
                    )}
                </div>

                <div className="absolute -bottom-8 left-8">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHoveringProfile(true)}
                        onMouseLeave={() => setIsHoveringProfile(false)}
                    >
                        <img
                            src={groupInfo?.groupPictureUrl || 'https://via.placeholder.com/160'}
                            alt="Group"
                            className="w-40 h-40 rounded-full border-4 border-white object-cover"
                        />
                        {isHoveringProfile && (
                            <label className="absolute bottom-2 right-2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-100">
                                <CameraIcon className="h-5 w-5 text-gray-700" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpdate(e.target.files[0], 'picture')}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6"></div>
            <h1 className="text-3xl font-bold dark:text-white mb-2">
                {groupInfo?.name || 'Loading...'}
            </h1>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6"></div>
            <h1 className="text-2xl font-bold mb-6 dark:text-white">Quản lý quyền nhóm</h1>

            {saving && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Đang lưu thay đổi...
                </div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {roles.map((role) => (
                    <div
                        key={role.roleGroupId}
                        className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6"
                    >
                        <h2 className="text-xl font-semibold mb-4 dark:text-white">
                            {roleNames[role.role]}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {role.permissions.map((permission) => (
                                <div
                                    key={permission.id}
                                    className="flex items-center justify-between p-4 bg-white dark:bg-neutral-700 rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-medium dark:text-white">
                                            {permission.name.replace(/([A-Z])/g, ' $1').trim()}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {permission.description}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={permission.isAllowed}
                                        onChange={() => handlePermissionToggle(role.roleGroupId, permission.id, permission.isAllowed)}
                                        color="primary"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupManagement;