import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    TextField,
    MenuItem,
    Button,
    Grid,
    Paper,
    IconButton,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { ArrowBack, BackHandOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { use } from 'framer-motion/client';
import { authApi } from '../../../api';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('0');
    const [privacy, setPrivacy] = useState('public');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [invitedFriends, setInvitedFriends] = useState('');
    const [canCreate, setCanCreate] = useState(false);
    useEffect(() => {
        if (groupName && description) {
            setCanCreate(true);
        }
        else {
            setCanCreate(false);
        }
    }, [groupName, description]);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }

    const handleCreateGroup = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await authApi.createGroup(
                groupName,
                description,
                parseInt(visibility)
            );

            if (response) {
                alert('Nhóm đã được tạo thành công');
                navigate('/groups'); // Redirect to groups page after successful creation
            }
        } catch (err) {
            setError('Failed to create group. Please try again.');
            console.error('Error creating group:', err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px', height: '100vh' }}>
            {/* Bên trái: Tạo nhóm */}
            <Box sx={{ width: '30%', mr: 4 }}>
                <IconButton
                    sx={{ ml: -1, mb: 2 }}
                    onClick={handleBack}
                >
                    <ArrowBack />
                </IconButton>

                <Typography variant="h5" fontWeight="bold">
                    Tạo nhóm
                </Typography>

                {/* Thông tin người dùng */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Avatar src="/static/images/avatar/1.jpg" alt="Avatar" />
                    <Box ml={2}>
                        <Typography variant="body1">
                            {
                                JSON.parse(localStorage.getItem('user'))?.fullName
                            }
                        </Typography>
                        <Typography variant="caption" >
                            Quản trị viên
                        </Typography>
                    </Box>
                </Box>

                {/* Nhập tên nhóm */}
                <TextField
                    label="Tên nhóm"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={groupName}
                    InputProps={{
                        className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white', // áp dụng style Tailwind cho input
                    }}
                    InputLabelProps={{
                        className: 'text-gray-500 dark:text-gray-400', // style Tailwind cho label
                    }}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <TextField
                    label="Mô tả nhóm"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    InputProps={{
                        className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                    }}
                    InputLabelProps={{
                        className: 'text-gray-500 dark:text-gray-400',
                    }}
                />
                {/* Chọn quyền riêng tư */}
                <TextField
                    select
                    label="Chọn quyền riêng tư"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={visibility}
                    InputProps={{
                        className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white', // áp dụng style Tailwind cho input
                    }}
                    InputLabelProps={{
                        className: 'text-gray-500 dark:text-gray-400', // style Tailwind cho label
                    }}
                    onChange={(e) => setVisibility(e.target.value)}
                >
                    <MenuItem value="0">Công khai</MenuItem>
                    <MenuItem value="1">Riêng tư</MenuItem>
                </TextField>

                {/* Mời bạn bè */}
                <TextField
                    label="Mời bạn bè (không bắt buộc)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputProps={{
                        className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white', // áp dụng style Tailwind cho input
                    }}
                    InputLabelProps={{
                        className: 'text-gray-500 dark:text-gray-400', // style Tailwind cho label
                    }}
                />

                <Typography variant="caption" >
                    Gợi ý: Lê Sỹ Nguyên, Nguyễn Tấn, Ngọc Toàn
                </Typography>

                {/* Nút Tạo */}
                <Button
                    variant="contained"
                    fullWidth
                    className={`mt-2 ${!canCreate ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white 
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white`}
                    disabled={!canCreate}
                    onClick={handleCreateGroup}
                >
                    {loading ? 'Đang tạo...' : 'Tạo nhóm'}
                </Button>
            </Box>

            {/* Bên phải: Xem trước */}
            <Box sx={{ width: '70%' }}>
                <Typography variant="h6">Xem trước trên máy tính</Typography>
                <Paper sx={{ p: 2, mt: 2, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                    {/* Ảnh xem trước */}
                    <Box
                        sx={{
                            height: 200,
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <GroupIcon sx={{ fontSize: 80, color: '#bdbdbd' }} />
                    </Box>

                    {/* Thông tin nhóm */}
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6">{groupName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {privacy == 'public' ? 'Công khai' : 'Riêng tư'} · 1 thành viên
                        </Typography>
                        <p className="text-gray-600 dark:text-gray-300">
                            {description || 'Mô tả nhóm sẽ xuất hiện ở đây'}
                        </p>
                    </Box>

                    {/* Các tab */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #e0e0e0',
                            pt: 1,
                        }}
                    >
                        <Button sx={{ textTransform: 'none' }}>Giới thiệu</Button>
                        <Button sx={{ textTransform: 'none' }}>Bài viết</Button>
                        <Button sx={{ textTransform: 'none' }}>Thành viên</Button>
                        <Button sx={{ textTransform: 'none' }}>Sự kiện</Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default CreateGroup;
