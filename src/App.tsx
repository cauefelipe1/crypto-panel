import { useEffect, useState } from 'react';
import './App.css';


//import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
//import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/themes/mira/theme.css';


import axios from 'axios';
import CryptoSummary from './components/CryptoSummary';
import { CryptoModel } from './models/Crypto';
import moment from 'moment';

import {Dropdown} from 'primereact/dropdown';

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


export default function App() {

  //const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
  const baseCoinGeckoUrl = "https://api.coingecko.com/api/v3/"

  const defaultDataset ={
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)'
  };

  const defaultOptions: ChartOptions<"line"> = {
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
  const [selected, setSelected] = useState<CryptoModel | null>();
  const [chartIntervalSelected, setChartIntervalSelected] = useState(30);
  const [data, setData] = useState<ChartData<"line">>();


  const [options, setOptions] = useState<ChartOptions<"line">>(defaultOptions);

  useEffect(function loadCoinsDropDown() {
    const url = baseCoinGeckoUrl + "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    
    axios.get(url)
      .then((response) => {
        setCryptos(response.data);
      }).catch((e) => {
        console.log(e);
      });
      
  }, []);

  useEffect(() => {
    async function loadChartData(){
      if (!selected)
        return;

      const interval = chartIntervalSelected > 1 ? "&interval=daily" : "";

      const url = baseCoinGeckoUrl + `coins/${selected.id}/market_chart?vs_currency=usd&days=${chartIntervalSelected}${interval}`;

      try{
        const marketData = await axios.get(url)
        
        const labels = marketData.data.prices.map((price: number[]) => {
          const date = moment.unix(price[0] / 1000);

          if (chartIntervalSelected == 1)
            return date.format('LT');
          
          return date.format('MM-DD-YYYY');
        });

        setData({
          labels,
          datasets: [
            {
              ...defaultDataset,
              
              label: selected.name,
              data: marketData.data.prices.map((price: number[]) => {
                return price[1];
              })
            }
          ],
        });

        const options = {
          ...defaultOptions
        };

        if (options.plugins?.title){
          options.plugins.title.text = `${selected.name} Price over last ${chartIntervalSelected} day${chartIntervalSelected > 1 ? "s" : ""}`;
        }

        setOptions(options);

      } catch(e) {
        console.log(e);
      }
    }

    loadChartData();
  }, [selected, chartIntervalSelected]);

  const cryptoOptTemplate = (c: CryptoModel) => {
    return (
        <div className="dropdown-item">
            <img alt={c.name} src={c.image}  style={{ width: '18px' }} className="icon" />
            <div>{c.name}</div>
        </div>
    );
  };

  const selectedCryptoTemplate = (c: CryptoModel, props: any) => {
    if (c) {
        return (
          <div className="dropdown-item">
                <img alt={c.name} src={c.image} style={{ width: '18px' }} className="icon"/>
                <div>{c.name}</div>
            </div>
        );
    }

    return <span>{props.placeholder}</span>;
  };

  return (
    <div className="App">
      
      <div >
        {
          cryptos ? 
            <Dropdown 
              className="chart-selector"
              options={cryptos}
              optionLabel="name"
              optionValue="id"
              checkmark={false}
              filter
              value={selected}
              itemTemplate={cryptoOptTemplate}
              valueTemplate={selectedCryptoTemplate}
              placeholder="Choose a crypto"
              onChange={(e) => setSelected(e.value)}
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