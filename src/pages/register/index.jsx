// src/pages/MyPage.jsx
import React, { lazy, Suspense } from 'react';

const Content = lazy(() => import('./content'));

const RegisterPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Content />
        </Suspense>
    );
};

export default RegisterPage;

