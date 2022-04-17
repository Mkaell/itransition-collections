import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage/AdminPage';
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
            <Route
                path='/admin'
                element={<AdminPage />}
            />

        </Routes>
    )
}

export default Navigation