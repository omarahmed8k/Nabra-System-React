import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import sweetAlerts from '../../helpers/sweetAlerts';
import userServices from '../../services/userServices';
import userSvg from '../../assets/svgs/profile.svg';
import './Profile.scss'

export default function Profile() {
    const userId = useSelector(state => state.auth.userId);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    async function getProfile() {
        setLoading(true);
        try {
            const { data } = await userServices.getUser(userId);
            setUser(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            sweetAlerts.error(error.response.data.msg);
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className='profile-page'>
                <img src={userSvg} alt="userd" />
                <h1 className='title'>{user?.name || ""}</h1>
                <p>{user?.email || ""}</p>
                <p>Tasks Todo: {user?.lists || 0}</p>
            </div>
        </>
    )
}
