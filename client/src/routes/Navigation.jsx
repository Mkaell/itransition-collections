import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

const Navigation = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<HomePage />}
            />
            <Route
                path='/login'
                element={<LoginPage />}
            />
            <Route
                path='/sign-up'
                element={<SignUpPage />}
            />

        </Routes>
    )
}

export default Navigation