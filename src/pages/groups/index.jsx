import React from 'react';
import Sidebar from './SideBar';
import Post from '../../components/Post';
import Feed from '../../components/Feed';
// import Post from './Post';

const GroupPage = () => {
    return (
        <div className=" bg-[#f7f7f7] dark:bg-[#18191a] ">
            <div className="flex justify-between ">
                <Sidebar />
                <div className="flex-grow p-4 items-center flex flex-col 2xl:pl-72 xl:pl-48 pl-20">
                    <div className='max-w-[600px] min-w-[500px] '>
                        <Feed />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupPage;