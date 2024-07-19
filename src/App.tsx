import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { CryptoModel } from './models/Crypto';

function App() {
  //const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"  

  const [cryptos, setCryptos] = useState<CryptoModel[] | null>();

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    
    axios.get(url)
      .then((response) => {
        setCryptos(response.data);
      })
      
  }, []);

  return (
    <div className="App">
      {
        cryptos
          ? cryptos.map((crypto) => {
              return (
                <CryptoSummary 
                  key={crypto.id}
                  crypto={crypto}/>);
            }) 
        : null
      }
    </div>
  );
}

export default App;
