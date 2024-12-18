import React, { useEffect, useState } from 'react';
import { Divider, IconButton, InputBase } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import { IoSearchCircleOutline } from 'react-icons/io5';
import SearchIcon from '@mui/icons-material/Search';
import { faker } from '@faker-js/faker';
import { KeyboardArrowUp } from '@mui/icons-material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api';
const myGroups = [
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
]
const suggestions = [
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
];
const Sidebar = () => {
    const [managedGroups, setManagedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleShowMoreSuggestions = () => {
        setShowAllSuggestions((prev) => !prev);
    };
    const navigate = useNavigate();
    const handleCreateGroup = () => {
        navigate('/groups/create');
    }
    useEffect(() => {
        fetchGroups();
    }, []);
    const fetchGroups = async () => {
        try {
            setLoading(true);
            // alert('fetching groups');
            const [createdGroupsResponse, joinedGroupsResponse] = await Promise.all([
                authApi.getUserCreatedGroups(),
                authApi.getUserGroups()
            ]);

            setManagedGroups(createdGroupsResponse || []);
            setJoinedGroups(joinedGroupsResponse || []);
            console.log('Managed groups:', createdGroupsResponse);
            console.log('Joined groups:', joinedGroupsResponse);
        } catch (err) {
            setError('Failed to load groups');
            console.error('Error fetching groups:', err);
        } finally {
            setLoading(false);
        }
    };
    const handleGroupClick = (group) => {
        if (managedGroups.find(g => g.id === group.id)) {
            navigate(`/group/manage/${group.id}`);
        } else {
            navigate(`/group/${group.id}`);
        }
    };
    return (
        <div className="w-80 p-4 bg-white h-screen rounded-md shadow-lg dark:bg-[#18191a] fixed overflow-scroll no-scrollbar">
            <h2 className="text-xl font-bold">Nhóm</h2>
            <div className=" p-1 shadow-sm my-4 relative bg-gray-100 dark:bg-gray-600 py-2 w-10 h-10 dark:text-gray-300 sm:w-11 sm:h-11 lg:h-10 lg:w-10 xl:w-max xl:pl-3 xl:pr-8 rounded-full flex items-center justify-center cursor-pointer">
                <SearchIcon />
                <input
                    type='text'
                    placeholder="Tìm kiếm nhóm..."
                    className="outline-none bg-transparent hidden xl:inline-block pl-2"
                />
            </div>
            <div className="mt-4">
                <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <FeedIcon />
                    <span className='pl-3'>Bảng feed của bạn</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <ExploreIcon />
                    <span className='pl-3'>Khám phá</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <GroupIcon />
                    <span className='pl-3'>Nhóm của bạn</span>
                </div>
            </div>
            <button onClick={handleCreateGroup}
                className="mt-4 w-full bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 duration-300 ">
                + Tạo nhóm mới
            </button>

            <Divider className="py-2 w-full border-gray-900 " />

            <div className='pt-8'>
                <div className="flex justify-between items-center px-4 h-4 group ">
                    <span className="font-semibold text-gray-800 text-sm dark:text-white">
                        Nhóm do bạn quản lý
                    </span>

                </div>

                <ul className="p-4">
                    <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${showAllSuggestions ? "max-h-[2000px]" : "max-h-[245px]"}`}>
                        {managedGroups?.slice(0, showAllSuggestions ? suggestions.length : 7)
                            .map((data, index) => (
                                <Link to={`/groups/manage/${data.id}`} key={index}>
                                    <li >
                                        <div className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                            <img
                                                src={faker.image.urlPicsumPhotos()}
                                                alt={data.name}
                                                className="w-8 h-8 rounded-lg"
                                            />
                                            <span className="font-semibold text-[14px] dark:text-white">{data.name}</span>
                                        </div>
                                    </li>
                                </Link>
                            ))}

                    </div>
                    <li>
                        <div
                            onClick={handleShowMoreSuggestions}
                            className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <span className="w-8 h-8 rounded-full grid place-items-center bg-gray-300 dark:bg-gray-600">
                                {
                                    showAllSuggestions ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />
                                }
                            </span>
                            <span className="font-semibold dark:text-white">{showAllSuggestions ? "Thu gọn" : "Xem thêm"}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <Divider className="py-2 w-full border-gray-900 " />

            <div className='pb-10'>
                <div className="flex justify-between items-center px-4 h-4 group ">
                    <span className="font-semibold text-gray-800 text-sm dark:text-white">
                        Nhóm bạn đã tham gia
                    </span>

                </div>

                <ul className="p-4">
                    <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${showAllSuggestions ? "max-h-[2000px]" : "max-h-[245px]"}`}>
                        {joinedGroups.slice(0, showAllSuggestions ? suggestions.length : 7)
                            .map((data, index) => (
                                <Link to={`/group/${data.id}`} key={index}>
                                    <li>
                                        <div className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                            <img
                                                src={faker.image.urlPicsumPhotos()}
                                                alt={data.name}
                                                className="w-8 h-8 rounded-lg"
                                            />
                                            <span className="font-semibold text-[14px] dark:text-white ">{data.name}</span>
                                        </div>
                                    </li>
                                </Link>
                            ))}

                    </div>
                    <li>
                        <div
                            onClick={handleShowMoreSuggestions}
                            className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <span className="w-8 h-8 rounded-full grid place-items-center bg-gray-300 dark:bg-gray-600">
                                {
                                    showAllSuggestions ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />
                                }
                            </span>
                            <span className="font-semibold dark:text-white">{showAllSuggestions ? "Thu gọn" : "Xem thêm"}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
