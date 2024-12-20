import React, { PropsWithChildren } from 'react';
import MainContentContainer from '../pages/common';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import RightMenuWatch from '../pages/watch/RightMenuWatch';


const NewsFeedLayout = (props) => {
    const { children } = props;
    const location = useLocation();
    return (
        <div className="flex min-h-full w-full flex-col bg-[#f7f7f7] dark:bg-[#18191a]">
            <NavBar />
            <MainContentContainer>
                <div className="flex">
                    <LeftMenu />
                    <section className="xl:w-3/5 flex justify-center xl:ml-[20%]">{children}</section>
                    {
                        location.pathname == '/watch' || location.pathname == '/savedvideos' ? <RightMenuWatch /> : <RightMenu />
                    }

                </div>
            </MainContentContainer>
        </div>
    );
};

export default NewsFeedLayout;