import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import sweetAlerts from '../../helpers/sweetAlerts';
import Loader from '../../components/Loader/Loader';
import DataTable from '../../components/DataTable/DataTable';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import SchoolsServices from '../../services/schoolsServices';
import Edit from '../../assets/svgs/edit.svg'
import Delete from '../../assets/svgs/delete.svg'
import './Schools.scss'

export default function Schools() {
    const navigate = useNavigate();
    const [schools, setSchools] = useState([])
    const [loading, setLoading] = useState(false);

    async function deleteSchool(schoolId) {
        setLoading(true);
        try {
            await SchoolsServices.deleteSchool(schoolId)
            setLoading(false);
            sweetAlerts.success("School deleted successfully");
            getSchools();
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    async function getSchools() {
        setLoading(true);
        try {
            const { data } = await SchoolsServices.allSchools();
            const customData = data?.map((school) => {
                return {
                    logo:
                        <div className='logo-container'>
                            <ImageViewer
                                galleryID="logos"
                                images={[
                                    {
                                        largeURL: school.logo,
                                        thumbnailURL: school.logo,
                                        width: 1875,
                                        height: 2500,
                                    },
                                ]}
                            />
                        </div>
                    ,
                    name_en: school.name_en,
                    name_ar: school.name_ar,
                    actions:
                        <div className='actions'>
                            <button className='edit-btn icons' onClick={() => { navigate(`/settings/schools/${school._id}`) }}>
                                <img src={Edit} alt="edit" />
                            </button>
                            <button className='delete-btn icons' onClick={() => { deleteSchool(school._id) }}>
                                <img src={Delete} alt="delete" />
                            </button>
                        </div>
                }
            })
            setSchools(customData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    useEffect(() => {
        getSchools();
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className='list-page'>
                <h1 className='title'>Schools</h1>
                <div className='lists-container'>
                    <DataTable tableHead={["Logo", 'Name EN', 'Name AR', 'Actions']} tableBody={schools} />
                </div>
            </div>
        </>
    )
}
