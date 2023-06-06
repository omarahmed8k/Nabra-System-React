import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import sweetAlerts from '../../helpers/sweetAlerts';
import schoolsServices from '../../services/schoolsServices';
import Loader from '../../components/Loader/Loader';
import './AddSchools.scss'

export default function AddSchools() {
  const navigate = useNavigate();
  const [name_en, setNameEn] = useState('');
  const [name_ar, setNameAr] = useState('');
  const [logo, setLogo] = useState([]);
  const [personal_images, setPersonalImages] = useState([]);
  const [studio_images, setStudioImages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addSchools() {
    // if (!name_en || !name_ar || !logo || !personal_images || !studio_images) {
    //   sweetAlerts.error('Please fill all the fields');
    //   return;
    // }

    setLoading(true);
    try {

      const formData = new FormData();
      formData.append('name_en', name_en);
      formData.append('name_ar', name_ar);
      logo != ("" || undefined || null || []) && formData.append('logo', logo);
      for (let i = 0; i < personal_images.length; i++) {
        formData.append('personal_images', personal_images[i]);
      }
      for (let i = 0; i < studio_images.length; i++) {
        formData.append('studio_images', studio_images[i]);
      }
      const { data } = await schoolsServices.createSchool(formData);
      console.log(data)
      setLoading(false);
      sweetAlerts.success('School Added');
      navigate(-1);
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
        <h1 className='title'>Add School</h1>
        <form className='col-2-columns'>
          <div className='input-container'>
            <label>Name EN</label>
            <input type='text' placeholder='Name in English' value={name_en} onChange={(e) => setNameEn(e.target.value)} />
          </div>
          <div className='input-container'>
            <label>Name AR</label>
            <input type='text' placeholder='Name in Arabic' value={name_ar} onChange={(e) => setNameAr(e.target.value)} />
          </div>
          <div className='input-container'>
            <label>Logo</label>
            <input type='file' onChange={(e) => setLogo(e.target.files[0])} />
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
        <button className="main-btn" type='button' onClick={(e) => { e.preventDefault(); addSchools() }}>Add School</button>
      </div>
    </>
  )
}
