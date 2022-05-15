import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage/AdminPage';
import Collection from '../pages/Collection/Collection';
import HomePage from '../pages/HomePage/HomePage';
import ItemPage from '../pages/ItemPage/ItemPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import SearchitemsTags from '../pages/SearchitemsTags/SearchitemsTags';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import { ROUTES } from './constants'

const Navigation = () => {
    return (
        <Routes>
            <Route
                path={ROUTES.HOME}
                element={<HomePage />}
            />
            <Route
                path={ROUTES.LOGIN}
                element={<LoginPage />}
            />
            <Route
                path={ROUTES.SIGNUP}
                element={<SignUpPage />}
            />
            <Route
                path={ROUTES.ADMIN}
                element={<AdminPage />}
            />
            <Route
                path={ROUTES.PROFILE}
                element={<ProfilePage />}
            />
            <Route
                path={ROUTES.SEARCH_ITEMS}
                element={<SearchitemsTags />}
            />
            <Route
                path={ROUTES.PROFILE_BY_ADMIN}
                element={<ProfilePage />} />
            <Route
                path={ROUTES.COLLECTION}
                element={<Collection />} />
            <Route
                path={ROUTES.ITEM}
                element={<ItemPage />}
            />
        </Routes>
    )
}

export default Navigation