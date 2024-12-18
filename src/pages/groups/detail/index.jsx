import { faker } from '@faker-js/faker';
import PostForm from '../../../components/PostForm';
import PostContainer from '../../profiles/PostContainer';
import { useEffect, useState } from 'react';
import { profileApi } from '../../../api';
import { useParams } from 'react-router-dom';
function GroupDetail() {
    const { id: groupId } = useParams();
    const [postsView, setPostsView] = useState('listView');
    const [groupInfo, setGroupInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchGroupInfo = async () => {
            try {
                setLoading(true);
                const response = await profileApi.getGroupInfo(groupId);
                if (response?.groupPictureUrl?.startsWith("/files")) {
                    response.groupPictureUrl = `${BASE_URL}${response.groupPictureUrl}`;
                }
                if (response?.groupBackgroundUrl?.startsWith("/files")) {
                    response.groupBackgroundUrl = `${BASE_URL}${response.groupBackgroundUrl}`;
                }
                setGroupInfo(response);
            } catch (err) {
                setError('Failed to load group info');
                console.error('Error fetching group info:', err);
            } finally {
                setLoading(false);
            }
        };

        // Get logged in user
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(user);

        fetchGroupInfo();
    }, [groupId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                {error}
            </div>
        );
    }
    return (
        <div className="h-full w-full ">
            <div className="h-auto w-full bg-[#f7f7f7] dark:bg-[#18191a]">
                <div className="mx-auto h-full max-w-5xl rounded-md  dark:bg-neutral-800">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#4276bc] to-transparent opacity-70 z-[1]"></div>

                    <div
                        className="relative h-[23.75rem] max-h-[23.75rem] w-full rounded-lg z-[2]"
                        style={{
                            backgroundImage: `url('${groupInfo?.groupBackgroundUrl || 'https://via.placeholder.com/1920x400'}')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                    </div>
                    <div className="mx-auto h-full px-10">
                        <div className="flex items-end gap-5 border-b pb-5 dark:border-stone-700">
                            <div className="flex-1 flex-col pb-2  z-[2]">
                                <p className="text-[2rem] font-bold text-black dark:text-gray-200">
                                    {groupInfo?.name}
                                </p>
                                <a className="cursor-pointer text-sm font-semibold text-gray-600 hover:underline dark:text-gray-300">
                                    {groupInfo?.isPrivate ? 'Nhóm riêng tư' : 'Nhóm công khai'} · {groupInfo?.memberCount || Math.floor(Math.random() * 10)} thành viên
                                </a>
                                <div className="flex w-full items-center justify-between">
                                    <div className="mt-2 flex items-center">

                                        {
                                            Array.from({ length: 10 }).map((_, index) => (
                                                <img
                                                    className="cursor-pointer rounded-full border-2 border-white dark:border-neutral-600 w-8 h-8 -ml-2"
                                                    alt="friend"
                                                    src={faker.image.avatar()}
                                                />
                                            ))
                                        }
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none">
                                            <i className="fas fa-plus-circle mr-2"></i>Mời
                                        </button>
                                        <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                                            <i className="fas fa-share mr-2"></i>Chia sẻ
                                        </button>
                                        <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                                            <i className="fas fa-users mr-2"></i>
                                            Đã tham gia &nbsp;
                                            <i className="fas fa-chevron-down"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-1 flex items-center justify-between  ">
                            <div className="mb-2 flex items-center space-x-2 z-[3]">
                                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                                    Giới thiệu
                                </button>
                                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                                    Thảo luận
                                </button>
                                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                                    Đáng chú ý
                                </button>
                                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                                    Thành viên
                                </button>
                                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                                    Sự kiện
                                </button>
                                <button className="rounded-md px-2 py-3 text-sm font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-neutral-700">
                                    File
                                </button>
                            </div>
                            <button className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold text-black hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600 z-[2]">
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* After bio content */}
            <div className="mx-auto my-3 h-full max-w-5xl z-[2] ">
                <div className="grid grid-cols-5 gap-4">

                    <div className="col-span-3 " >
                        {/* Create post */}
                        <PostForm isShow={true} />


                        {/* user posts */}
                        <PostContainer postsView={postsView} />
                    </div>
                    <div className="col-span-2 flex flex-col gap-4 sticky max-h-fit top-[70px]">
                        <div className="flex flex-col gap-4 rounded-lg bg-white p-3 text-gray-600 shadow dark:bg-neutral-800 dark:text-gray-300">
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-300">
                                Giới thiệu
                            </p>

                            <div className="flex flex-col space-y-4 text-sm">
                                <div className="flex flex-col">
                                    <p>{groupInfo?.description}</p>

                                    <p>👉… Xem thêm</p>
                                </div>
                                <div className="flex  space-x-2 pr-4">
                                    <div>
                                        <i className="fas fa-lock text-[1.25rem] text-gray-400"></i>
                                    </div>
                                    <div>
                                        {groupInfo?.isPrivate ? (
                                            <>
                                                Riêng tư{' '}
                                                <p className="font-semibold">
                                                    Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ đăng
                                                </p></>)
                                            :
                                            <>
                                                Công khai{' '}
                                                <p className="font-semibold">
                                                    Ai cũng có thể thấy nhóm này
                                                </p></>
                                        }
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="flex flex-col gap-4 rounded-lg bg-white p-3 text-gray-600 dark:text-gray-200 shadow dark:bg-neutral-800">
                            <div className="flex items-center justify-between">
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-300">
                                    File phương tiện
                                </p>
                                <a className="cursor-pointer text-sm text-primary hover:underline">
                                    Xem tất cả
                                </a>
                            </div>
                            <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-md">
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/125"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/124"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/123"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/122"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/121"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/120"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/119"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/118"
                                />
                                <img
                                    className="w-full"
                                    alt="photo"
                                    src="https://random.imagecdn.app/125/117"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupDetail;