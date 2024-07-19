import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { CryptoModel } from './models/Crypto';
import moment from 'moment';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function App() {

  //const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  const baseCoinGeckoUrl = "https://api.coingecko.com/api/v3/"

  const [cryptos, setCryptos] = useState<CryptoModel[] | null>();
  const [selected, setSelected] = useState<CryptoModel | null>();
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  });

  useEffect(() => {
    const url = baseCoinGeckoUrl + "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    
    axios.get(url)
      .then((response) => {
        setCryptos(response.data);
      })
      
  }, []);

  return (
    <div className="App">
      <select
        defaultValue="default"
        onChange={async (e) => {
          if (e.target.value === "default") {
            return;
          }

          const crypto = cryptos?.find((c) => c.id === e.target.value);

          setSelected(crypto);

          const url = baseCoinGeckoUrl + "coins/" + crypto?.id + "/market_chart?vs_currency=usd&days=30&interval=daily";

          try{
            const marketData = await axios.get(url)
            
            const labels = marketData.data.prices.map((price: number[]) => {
              return moment.unix(price[0] / 1000).format('MM-DD-YYYY');
            });

            console.log(marketData.data);

            setData({
              labels,
              datasets: [
                {
                  label: 'Dataset 1',
                  data: marketData.data.prices.map((price: number[]) => {
                    return price[1];
                  }),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ],
            });

          } catch(e) {
            console.log(e);
          }
          
        }}
      >
        <option value="default"> Choose an option </option>
        {
          cryptos
            ? cryptos.map((crypto) => {
             
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

      {
        data ? 
          <div style={{width: 600}}>
            <Line options={options} data={data} />
          </div>
          : null
        }
    </div>
  );
}

export default App;
