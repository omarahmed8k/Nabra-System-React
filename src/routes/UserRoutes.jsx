import { Navigate, Route, Routes } from 'react-router-dom'
import AddList from '../pages/AddList/AddList'
import EditList from '../pages/EditList/EditList'
import Requests from '../pages/Requests/Requests'
import Profile from '../pages/Profile/Profile.jsx'
import Settings from '../pages/Settings/Settings.jsx'
import Schools from '../pages/Schools/Schools.jsx'
import AddSchools from '../pages/AddSchools/AddSchools.jsx'
import EditSchools from '../pages/EditSchools/EditSchools.jsx'
import SchoolImages from '../pages/SchoolImages/SchoolImages.jsx'
import AddSchoolsImages from '../pages/AddSchoolsImages/AddSchoolsImages.jsx'
import EditSchoolImages from '../pages/EditSchoolImages/EditSchoolImages.jsx'

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Navigate to="/requests" />} />
            <Route path="/" element={<Navigate to="/requests" />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/requests" element={<Requests />} />
            <Route path="/requests/add" element={<AddList />} />
            <Route path="/requests/:listId" element={<EditList />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/settings/schools" element={<Schools />} />
            <Route path="/settings/schools/add" element={<AddSchools />} />
            <Route path="/settings/schools/:schoolId" element={<EditSchools />} />

            <Route path="/settings/schools-images" element={<SchoolImages />} />
            <Route path="/settings/schools-images/add" element={<AddSchoolsImages />} />
            <Route path="/settings/schools-images/:schoolId" element={<EditSchoolImages />} />
        </Routes>
    )
}
