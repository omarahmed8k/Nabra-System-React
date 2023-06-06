import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import sweetAlerts from '../../helpers/sweetAlerts';
import schoolsServices from '../../services/schoolsServices';
import Loader from '../../components/Loader/Loader';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import handleDataChange from '../../helpers/handleDataChange';
import './EditSchools.scss'

export default function EditSchools() {
  const navigate = useNavigate();
  const params = useParams();
  const schoolId = params.schoolId;

  const [name_en, setNameEn] = useState('');
  const [name_ar, setNameAr] = useState('');
  const [logo, setLogo] = useState([]);
  const [personal_images, setPersonalImages] = useState([]);
  const [studio_images, setStudioImages] = useState([]);
  const [retreivedNameEn, setRetreivedNameEn] = useState('');
  const [retreivedNameAr, setRetreivedNameAr] = useState('');
  const [retreivedLogo, setRetreivedLogo] = useState('');
  const [retreivedPersonalImages, setRetreivedPersonalImages] = useState([]);
  const [retreivedStudioImages, setRetreivedStudioImages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getSchool() {
    setLoading(true);
    try {
      const { data } = await schoolsServices.getSchool(schoolId);
      setRetreivedNameEn(data.name_en);
      setRetreivedNameAr(data.name_ar);
      setRetreivedLogo(data.logo);
      setRetreivedPersonalImages(data.personal_images);
      setRetreivedStudioImages(data.studio_images);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      sweetAlerts.error(error.response.data.msg);
    }
    setLoading(false);
  }

  async function editSchools() {
    setLoading(true);
    try {
      const formData = new FormData();
      handleDataChange(name_en, retreivedNameEn) && formData.append('name_en', name_en);
      handleDataChange(name_ar, retreivedNameAr) && formData.append('name_ar', name_ar);
      handleDataChange(logo, retreivedLogo) && formData.append('logo', logo);
      handleDataChange(personal_images, retreivedPersonalImages) && formData.append('personal_images', personal_images);
      handleDataChange(studio_images, retreivedStudioImages) && formData.append('studio_images', studio_images);
      const { data } = await schoolsServices.editSchool(schoolId, formData);
      setLoading(false);
      sweetAlerts.success('School edited successfully');
      navigate(-1);
    } catch (error) {
      setLoading(false);
      sweetAlerts.error(error.response.data.msg);
    }
    setLoading(false);
  }

  useEffect(() => {
    getSchool();
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className='add-page'>
        <h1 className='title'>Edit School</h1>
        <form className='col-2-columns'>
          <div className='input-container'>
            <label>Name EN</label>
            <input type='text' placeholder='Name in English' value={name_en} onChange={(e) => setNameEn(e.target.value)} />
            {retreivedNameEn && <p>Current name: {retreivedNameEn}</p>}
          </div>
          <div className='input-container'>
            <label>Name AR</label>
            <input type='text' placeholder='Name in Arabic' value={name_ar} onChange={(e) => setNameAr(e.target.value)} />
            {retreivedNameAr && <p>Current name: {retreivedNameAr}</p>}
          </div>
          <div className='input-container'>
            <label>Logo</label>
            <input type='file' onChange={(e) => setLogo(e.target.files[0])} />
            <div className="images-viewer">
              <ImageViewer
                galleryID="logo"
                images={[{ largeURL: retreivedLogo, thumbnailURL: retreivedLogo, width: 1875, height: 2500 }]}
              />
            </div>
          </div>
          <div className='input-container'>
            <label>Personal Images</label>
            <input type='file' multiple onChange={(e) => setPersonalImages(e.target.files)} />
            <div className="images-viewer">

              <ImageViewer
                galleryID="personal"
                images={retreivedPersonalImages && retreivedPersonalImages.map((image) => (
                  { largeURL: image, thumbnailURL: image, width: 1875, height: 2500 }
                ))}
              />

              {retreivedPersonalImages && retreivedPersonalImages.map((image, index) => (
                <img key={index} src={image} alt='personal' />
              ))}
            </div>
          </div>
          <div className='input-container'>
            <label>Studio Images</label>
            <input type='file' multiple onChange={(e) => setStudioImages(e.target.files)} />
            <div className="images-viewer">
              {retreivedStudioImages && retreivedStudioImages.map((image, index) => (
                <img key={index} src={image} alt='studio' />
              ))}
            </div>
          </div>
        </form >
        <button className="main-btn" type='button' onClick={(e) => { e.preventDefault(); editSchools() }}>Edit School</button>
      </div >
    </>
  )
}
