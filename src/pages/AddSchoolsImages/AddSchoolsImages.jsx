import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import sweetAlerts from '../../helpers/sweetAlerts';
import schoolsServices from '../../services/schoolsServices';
import Loader from '../../components/Loader/Loader';
import './AddSchoolsImages.scss'

export default function AddSchoolsImages() {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState('');
  const [allSchools, setAllSchools] = useState([])
  const [personal_images, setPersonalImages] = useState([]);
  const [studio_images, setStudioImages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllSchools() {
    setLoading(true);
    try {
      const { data } = await schoolsServices.allSchools();
      setAllSchools(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      sweetAlerts.error(error.response.data.msg);
    }
    setLoading(false);
  }

  async function addSchoolsImages() {

    setLoading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < personal_images.length; i++) {
        formData.append('personal_images', personal_images[i]);
      }
      for (let i = 0; i < studio_images.length; i++) {
        formData.append('studio_images', studio_images[i]);
      }
      const { data } = await schoolsServices.editSchool(schoolId, formData);
      console.log(data)
      setLoading(false);
      sweetAlerts.success('Images Added');
      navigate(-1);
    } catch (error) {
      setLoading(false);
      sweetAlerts.error(error.response.data.msg);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllSchools();
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className='add-page'>
        <h1 className='title'>Add School Images</h1>
        <form className='col-1-columns'>
          <div className='input-container'>
            <label>School Name</label>
            <select onChange={(e) => setSchoolId(e.target.value)}>
              <option value='default' selected disabled>Select School</option>
              {allSchools?.map((school) => (
                <option key={school._id} value={school._id}>{school.name_en}</option>
              ))}
            </select>
          </div>
          <div className='input-container'>
            <label>Personal Images</label>
            <input type='file' multiple onChange={(e) => setPersonalImages(e.target.files)} />
          </div>
          <div className='input-container'>
            <label>Studio Images</label>
            <input type='file' multiple onChange={(e) => setStudioImages(e.target.files)} />
          </div>
        </form>
        <button className="main-btn" type='button' onClick={(e) => { e.preventDefault(); addSchoolsImages() }}>Add Images</button>
      </div>
    </>
  )
}
