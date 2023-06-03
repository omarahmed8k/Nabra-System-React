import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddList from '../pages/AddList/AddList'
import EditList from '../pages/EditList/EditList'
import Lists from '../pages/Lists/Lists'
import Profile from '../pages/Profile/Profile.jsx'

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Navigate to="/lists" />} />
            <Route path="/" element={<Navigate to="/lists" />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/add-list" element={<AddList />} />
            <Route path="/list/:listId" element={<EditList />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}
