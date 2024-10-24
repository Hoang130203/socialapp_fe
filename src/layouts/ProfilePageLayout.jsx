import React from 'react';
import MainContentContainer from '../pages/common';
import NavBar from '../components/NavBar';

const ProfilePageLayout = (props) => {
    const { children } = props;
    return (
        <div className="flex h-full w-full flex-col bg-[#f7f7f7] dark:bg-[#18191a] dark:text-white">
            <NavBar />
            <MainContentContainer>{children}</MainContentContainer>
        </div>
    );
};

export default ProfilePageLayout;