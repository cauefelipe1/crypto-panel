import { useEffect, useState } from 'react';
import './App.css';


//import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
//import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/themes/mira/theme.css';


import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { CryptoModel } from './models/Crypto';
import moment from 'moment';

import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function App() {

  //const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  const baseCoinGeckoUrl = "https://api.coingecko.com/api/v3/"

  const defaultDataset ={
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)'
  };

  const defaultOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Crypto Line Chart',
      },
    },
  };

  const [cryptos, setCryptos] = useState<CryptoModel[] | null>();
  const [selected, setSelected] = useState<CryptoModel[]>([]);
  const [chartIntervalSelected, setChartIntervalSelected] = useState(30);
  const [data, setData] = useState<ChartData<"pie">>();

  const [options, setOptions] = useState<ChartOptions<"pie">>(defaultOptions);
  const [totalCryptAmout, setTotalCryptAmout] = useState(0);

  useEffect(function loadCoinsDropDown() {
    const url = baseCoinGeckoUrl + "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    
    axios.get(url)
      .then((response) => {
        setCryptos(response.data);
      }).catch((e) => {
        console.log(e);
      });
      
  }, []);

  useEffect(function calcTotamCryptoAmount() {
    if (selected.length <= 0)
      return;

    let temp = 0;

    for (const s of selected) {
      temp+= (s.owned ?? 0) * s.current_price;
    }

    setTotalCryptAmout(temp);

    setData({
      labels: selected.map(s => s.name),
      datasets: [
        {
          label: '# of Votes',
          data: selected.map(s => s.owned),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    );
  }, [selected])


  
  const cryptoOptTemplate = (c: CryptoModel) => {
    return (
        <div className="dropdown-item">
            <img alt={c.name} src={c.image}  style={{ width: '18px' }} className="icon" />
            <div>{c.name}</div>
        </div>
    );
  };

  function updateOwner(crypto: CryptoModel, amount: number): void {
    let temp = [...selected];
    let found = temp.find(c => c.id === crypto.id);

    if (!found)
      return;

    found.owned = amount ?? 0;
    setSelected(temp);
  }

  return (
    <div className="App">
      
      <div >
        {
          cryptos ? 
            <MultiSelect 
              className="chart-selector"
              options={cryptos}
              optionLabel="name"
              // optionValue="id"
              // checkmark={false}
              filter
              display="chip"
              value={selected}
              itemTemplate={cryptoOptTemplate}
              // valueTemplate={selectedCryptoTemplate}
              placeholder="Choose a crypto"
              onChange={(e) => {
                setSelected(e.value);
              }}
            />
          : null
        }

        <Dropdown 
          className="chart-selector"
          options={[30, 7, 1]}
          value={chartIntervalSelected}
          defaultValue={30}
          onChange={(e) => setChartIntervalSelected(e.value)}
        />
      </div>

      {selected.map((s) => {
        return (<CryptoSummary 
                  key={s.id}
                  crypto={s}
                  updateOwner={updateOwner}
                />);
      })}

      {
        data ? 
          <div style={{width: 400}}>
            <Pie data={data} />
          </div>
          : null
      }

      <p>Your portifolio worth is: ${totalCryptAmout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>

    </div>
  );
}