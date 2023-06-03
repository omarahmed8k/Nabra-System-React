import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DataTable from '../../components/DataTable/DataTable.jsx'
import moment from 'moment/moment.js';
import Edit from '../../assets/svgs/edit.svg'
import Delete from '../../assets/svgs/delete.svg'
import sweetAlerts from '../../helpers/sweetAlerts';
import listsServices from '../../services/listsServices';
import Loader from '../../components/Loader/Loader.jsx';
import './Lists.scss'

export default function Lists() {
    const userId = useSelector(state => state.auth.userId);
    const navigate = useNavigate();
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(false);

    async function deleteList(listId) {
        setLoading(true);
        try {
            const { data } = await listsServices.deleteList(listId)
            setLoading(false);
            sweetAlerts.success("List deleted successfully");
            getLists();
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    async function getLists() {
        setLoading(true);
        try {
            const { data } = await listsServices.allList(userId);
            const newData = data.map((list) => {
                return {
                    description: list.description,
                    Date: `${moment(list.date).format('DD/MM/YYYY')}`,
                    Time: `${moment(list.date).format('hh:mm A')}`,
                    actions:
                        <div className='actions'>
                            <button className='edit-btn icons' onClick={() => { navigate(`/list/${list._id}`) }}>
                                <img src={Edit} alt="edit" />
                            </button>
                            <button className='delete-btn icons' onClick={() => { deleteList(list._id) }}>
                                <img src={Delete} alt="delete" />
                            </button>
                        </div>
                }
            })
            setLists(newData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
            sweetAlerts.error(error.response.data.msg);
        }
    }

    useEffect(() => {
        getLists();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className='list-page'>
                <h1 className='title'>Todo Lists</h1>
                <div className='lists-container'>
                    <DataTable tableHead={['Description', 'Date', "Time", 'Actions']} tableBody={lists} />
                </div>
            </div>
        </>
    )
}
