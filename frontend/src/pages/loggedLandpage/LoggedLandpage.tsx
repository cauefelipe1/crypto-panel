import './LoggedLandpage.scss';

import { Outlet } from 'react-router-dom';
//import Dashboard from '../../components/Dashboard/Dashboard';
import MainSideMenu from '../../components/MainSideMenu/MainSideMenu';
import Highlights from '../../components/Highlights/Highlights';


export default function LoggedLandpage() {

    return (
        <div className='main-app-container'>

            <div className='app-section side-menu'>
                <MainSideMenu/>
            </div>

            <div className='app-section content'>
                <Outlet/>
            </div>

            <div className='app-section highlights'> 
                <Highlights />
            </div>

        </div>
    );
}