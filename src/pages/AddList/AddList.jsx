import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sweetAlerts from '../../helpers/sweetAlerts';
import listsServices from '../../services/listsServices';
import Loader from '../../components/Loader/Loader';
import './AddList.scss'

export default function AddList() {
    const ownerId = useSelector(state => state.auth.userId);
    const navigate = useNavigate();
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);

    async function addList() {
        if (description === '') {
            sweetAlerts.error('Please fill all the fields');
            return;
        }

        setLoading(true);
        try {
            const { data } = await listsServices.createList({ description, ownerId });
            console.log(data)
            setLoading(false);
            sweetAlerts.success('List Added');
            navigate('/');
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    return (
        <>
            {loading && <Loader />}
            <div className='add-page'>
                <h1 className='title'>Add List</h1>
                <form className='col-1-columns'>
                    <div className='input-container'>
                        <label>Description</label>
                        <textarea name="description" onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>
                    <button className="main-btn" type='button' onClick={(e) => { e.preventDefault(); addList() }}>Add List</button>
                </form>
            </div>
        </>
    )
}
