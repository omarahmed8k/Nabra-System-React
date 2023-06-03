import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';

export default function ProtectedRoutes() {
    const auth = useSelector((state) => state.auth);
    return (
        auth?.access ? <MasterLayout /> : <Navigate to="/login" />
    )
}