import './App.css';

//import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
//import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/themes/mira/theme.css';

import CryptoPanelPage from './pages/CryptoPanelPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterUserPage from './pages/RegisterUserPage';
//import Dashboard from './pages/Dashboard';
import LoggedLandpage from './pages/loggedLandpage/LoggedLandpage';


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import Dashboard from './components/Dashboard/Dashboard';
import TradingMarket from './components/TradingMarket/TradingMarket';
import NotFound from './components/NotFound/NotFound';

library.add(fas, far, faCirclePlus, faTwitter, faFontAwesome)

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoggedLandpage />}>
          
          <Route path='panel' element={<CryptoPanelPage />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='trading-market' element={<TradingMarket />} />
          <Route path='*' element={<NotFound />} />

        </Route>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register-user' element={<RegisterUserPage />} />
        <Route path='*' element={<NotFound />} />
        
        {/* <div className="App">
          <CryptoPanelPage />
        </div> */}
      </Routes>
    </BrowserRouter>
  );
}