import { Link } from 'react-router-dom'
import Schools from '../../assets/svgs/office.svg';
import Images from '../../assets/svgs/attachments.svg';
import './Settings.scss'

export default function Settings() {

    return (
        <div className='add-page'>
            <h1 className='title'>Settings</h1>
            <div className="settings-links">
                <Link to="/settings/schools">
                    <img src={Schools} alt="school-details" />
                    <p>Schools</p>
                </Link>
                <Link to="/settings/schools-images">
                    <img src={Images} alt="school-images" />
                    <p>School Images</p>
                </Link>
            </div>
        </div>
    )
}
