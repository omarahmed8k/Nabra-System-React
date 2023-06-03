import React from 'react'
import UserRoutes from '../routes/UserRoutes'
import Sidebar from '../components/Sidebar/Sidebar.jsx'

export default function MasterLayout() {
    return (
        <div>
            <Sidebar />
            <div className="container">
                <UserRoutes />
            </div>
        </div>
    )
}
