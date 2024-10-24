// src/pages/MyPage.jsx
import React, { lazy, Suspense } from 'react';

const Content = lazy(() => import('./LoginContent'));

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>} >
            <Content />
        </Suspense>
    );
};

export default LoginPage;

