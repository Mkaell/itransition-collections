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
            <Route
                path='/profile'
                element={<ProfilePage />}
            />
            <Route
                path='/items'
                element={<SearchitemsTags />}
            />
            <Route
                path="/:useremail/:iduser"
                element={<ProfilePage />} />
            <Route
                path="/collection/:idCollection"
                element={<Collection />} />
            <Route
                path="/collection/:idCollection/item/:idItem"
                element={<ItemPage />}
            />

        </Routes>
    )
}

export default Navigation