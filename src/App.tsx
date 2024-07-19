import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

export type Crypto = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
}

function App() {
  //const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"  

  const [cryptos, setCryptos] = useState<Crypto[] | null>();

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
              return (<p>{crypto.name + " $" + crypto.current_price}</p>);
            }) 
        : null
      }
    </div>
  );
}

export default App;
