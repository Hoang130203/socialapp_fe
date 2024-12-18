import React, { useState } from 'react';
import { Divider, IconButton } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import ExploreIcon from '@mui/icons-material/Explore';
import { IoSearchCircleOutline } from 'react-icons/io5';
import SearchIcon from '@mui/icons-material/Search';
import { faker } from '@faker-js/faker';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';
const videoSuggestions = [
    {
        image: faker.image.urlPicsumPhotos(),
        title: faker.lorem.words(5),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        title: faker.lorem.words(5),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        title: faker.lorem.words(5),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        title: faker.lorem.words(5),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        title: faker.lorem.words(5),
    },
];

const RightMenuWatch = () => {
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);

    const handleShowMoreSuggestions = () => {
        setShowAllSuggestions((prev) => !prev);
    };

    return (
        <div className="w-1/5 bg-[rgb(247,247,247)] dark:bg-[#18191a] pt-16 h-full hidden xl:block px-4 fixed top-0 right-0 overflow-scroll scrollbar-hide dark:text-white">
            <h2 className="text-xl font-bold">Video</h2>

            <div className="p-1 shadow-sm my-4 relative bg-gray-100 dark:bg-gray-600 py-2 w-10 h-10 dark:text-gray-300 sm:w-11 sm:h-11 lg:h-10 lg:w-10 xl:w-max xl:pl-3 xl:pr-8 rounded-full flex items-center justify-center cursor-pointer">
                <SearchIcon />
                <input
                    type='text'
                    placeholder="Tìm kiếm video..."
                    className="outline-none bg-transparent hidden xl:inline-block pl-2"
                />
            </div>

            <div className="mt-4">
                <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                    <FeedIcon />
                    <span className='pl-3'>Video của bạn</span>
                </div>
                <Link to="/watch">
                    <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                        <ExploreIcon />
                        <span className='pl-3'>Khám phá</span>
                    </div>
                </Link>
                <Link to="/savedvideos">
                    <div className="flex items-center p-3 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                        <BookmarkIcon />
                        <span className='pl-3'>Video đã lưu</span>
                    </div>
                </Link>

            </div>

            <Divider className="py-2 w-full border-gray-900 " />

            <div className='pt-8'>
                <div className="flex justify-between items-center px-4 h-4 group ">
                    <span className="font-semibold text-gray-800 text-sm dark:text-white">
                        Video đề xuất
                    </span>
                </div>

                <ul className="p-4">
                    <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${showAllSuggestions ? "max-h-[2000px]" : "max-h-[245px]"}`}>
                        {videoSuggestions.slice(0, showAllSuggestions ? videoSuggestions.length : 5).map((data, index) => (
                            <li key={index}>
                                <div className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                    <img
                                        src={data.image}
                                        alt={data.title}
                                        className="w-8 h-8 rounded-lg"
                                    />
                                    <span className="font-semibold text-[14px] dark:text-white">{data.title}</span>
                                </div>
                            </li>
                        ))}
                    </div>
                    <li>
                        <div
                            onClick={handleShowMoreSuggestions}
                            className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                        >
                            <span className="w-8 h-8 rounded-full grid place-items-center bg-gray-300 dark:bg-gray-600">
                                {showAllSuggestions ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </span>
                            <span className="font-semibold dark:text-white">{showAllSuggestions ? "Thu gọn" : "Xem thêm"}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <Divider className="py-2 w-full border-gray-900 " />
        </div>
    );
};

export default RightMenuWatch;
