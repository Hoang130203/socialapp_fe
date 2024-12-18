import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import GamingPageLayout from '../components/layouts/GamingPageLayout';
// import MarketplacePageLayout from '../components/layouts/MarketplacePage';
import NewsFeedLayout from '../layouts/NewFeedLayout';
// import ProfilePageLayout from '../components/layouts/ProfilePageLayout';
// import WatchPageLayout from '../components/layouts/WatchPageLayout';
// import GamingPage from '../pages/gaming';
// import LoginPage from '../pages/login';
// import MarketplacePage from '../pages/marketplace';
// import NewsFeedPage from '../pages/newsfeed';
import PageNotFound from '../pages/notfound/index';
// import ProfilePage from '../pages/profile';
// import RegisterPage from '../pages/signup';
// import WatchPage from '../pages/watch';
import { PrivateRoute } from './PrivateRoute';
import {
    CREATE_GROUP,
    FRIENDS,
    GAME_DETAIL,
    GAMING,
    GROUP,
    GROUP_MANAGEMENT,
    GROUPDETAIL,
    HOME,
    LOGIN,
    MARKETPLACE,
    MESSAGES,
    PROFILE,
    REGISTER,
    SAVED_VIDEOS,
    WATCH,
} from './routes';
import Home from '../pages/home';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profiles';
import ProfilePageLayout from '../layouts/ProfilePageLayout';
import WatchPage from '../pages/watch';
import MarketPlacePage from '../pages/marketplace';
import GamingPage from '../pages/gaming';
import GroupPage from '../pages/groups';
import RegisterPage from '../pages/register';
import CreateGroup from '../pages/groups/create/CreateGroup';
import SavedVideos from '../pages/watch/SavedVideo/SavedVideo';
import MessagePage from '../pages/messages/MessagePage';
import GroupDetail from '../pages/groups/detail';
import FriendsTab from '../pages/friends/FriendsTab';
import GroupManagement from '../pages/groups/manage/GoupManagement';
import GameDetail from '../pages/gaming/GameDetail';

const Routers = () => {
    return (
        <Routes>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={REGISTER} element={<RegisterPage />} />

            <Route
                path={HOME}
                element={
                    <PrivateRoute layout={NewsFeedLayout}>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route path={PROFILE} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <ProfilePage />
                </PrivateRoute>
            } />

            <Route path={WATCH} element={
                <PrivateRoute layout={NewsFeedLayout}>
                    <WatchPage />
                </PrivateRoute>
            } />
            <Route path={SAVED_VIDEOS} element={
                <PrivateRoute layout={NewsFeedLayout}>
                    <SavedVideos />
                </PrivateRoute>
            } />
            <Route path={MESSAGES} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <MessagePage />
                </PrivateRoute>
            } />
            <Route path={MARKETPLACE} element={
                <PrivateRoute layout={NewsFeedLayout}>
                    <MarketPlacePage />
                </PrivateRoute>
            } />
            <Route path={GAMING} element={
                <PrivateRoute layout={NewsFeedLayout}>
                    <GamingPage />
                </PrivateRoute>
            } />
            <Route path={GROUP} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <GroupPage />
                </PrivateRoute>
            } />
            <Route path={GROUPDETAIL} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <GroupDetail />
                </PrivateRoute>
            } />

            <Route path={CREATE_GROUP} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <CreateGroup />
                </PrivateRoute>
            } />
            <Route path={FRIENDS} element={
                <PrivateRoute layout={NewsFeedLayout}>
                    <FriendsTab />
                </PrivateRoute>
            } />
            <Route path={GROUP_MANAGEMENT} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <GroupManagement />
                </PrivateRoute>
            } />
            <Route path={GAME_DETAIL} element={
                <PrivateRoute layout={ProfilePageLayout}>
                    <GameDetail />
                </PrivateRoute>
            } />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;