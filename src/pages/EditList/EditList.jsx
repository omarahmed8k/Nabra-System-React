import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import sweetAlerts from '../../helpers/sweetAlerts';
import listsServices from '../../services/listsServices';
import Loader from '../../components/Loader/Loader';

export default function EditList() {
    const navigate = useNavigate();
    const params = useParams();
    const listId = params.listId;

    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);

    async function getList() {
        setLoading(true);
        try {
            const { data } = await listsServices.getList(listId);
            setDescription(data.description);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    async function editList() {
        if (description === '') {
            sweetAlerts.error('Please fill all the fields');
            return;
        }

        setLoading(true);
        try {
            const { data } = await listsServices.editList(listId, { description });
            setLoading(false);
            sweetAlerts.success('List edited successfully');
            navigate('/');
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className='add-page'>
                <h1 className='title'>Edit List</h1>
                <form className='col-1-columns'>
                    <div className='input-container'>
                        <label>Description</label>
                        <textarea name="description" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    </div>
                    <button className="main-btn" type='button' onClick={(e) => { e.preventDefault(); editList() }}>Edit List</button>
                </form>
            </div>
        </>
    )
}
