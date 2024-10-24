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
    GAMING,
    GROUP,
    HOME,
    LOGIN,
    MARKETPLACE,
    PROFILE,
    REGISTER,
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
                <PrivateRoute layout={NewsFeedLayout}>
                    <GroupPage />
                </PrivateRoute>
            } />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default Routers;