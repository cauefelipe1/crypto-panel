import './App.css';

//import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
//import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/themes/mira/theme.css';

import CryptoPanelPage from './pages/CryptoPanelPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';
import Dashboard from './pages/Dashboard';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          
          <Route path='panel' element={<CryptoPanelPage />} />

        </Route>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register-user' element={<RegisterUserPage />} />
        
        {/* <div className="App">
          <CryptoPanelPage />
        </div> */}
      </Routes>
    </BrowserRouter>
  );
}