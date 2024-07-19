import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { CryptoModel } from './models/Crypto';

function App() {
  //const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"  

  const [cryptos, setCryptos] = useState<CryptoModel[] | null>();
  const [selected, setSelected] = useState<CryptoModel | null>();

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    
    axios.get(url)
      .then((response) => {
        setCryptos(response.data);
      })
      
  }, []);

  return (
    <div className="App">
      <select
        defaultValue="default"
        onChange={(e) => {
          const crypto = cryptos?.find((c) => c.id === e.target.value);

          setSelected(crypto);
        }}
      >
        <option value="default"> Choose an option </option>
        {
          cryptos
            ? cryptos.map((crypto) => {
              //   return (
              //     <CryptoSummary 
              //       key={crypto.id}
              //       crypto={crypto}/>);
              
                return (
                  <option
                    key={crypto.id}
                    value={crypto.id}
                  >
                    {crypto.name}
                  </option>) 
              })
          : null
        }
      </select>
      {selected ? <CryptoSummary crypto={selected} /> : null}
    </div>
  );
}

export default App;
