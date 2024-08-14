import "./Watchlist.scss";

import { useState, useEffect } from "react";
import { getCryptoSummariesDummyData } from "./Watchlist.helpers";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart as Chartjs} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'primereact/chart';
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { CryptoModel, CryptoSummary } from "../../../models/Crypto";
import WatchListCard from "./WatchListCard";
import ChartSummary from "./CoinSummary";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


Chartjs.register(annotationPlugin);

export default function Watchlist() {
    const baseCoinGeckoUrl = "https://api.coingecko.com/api/v3/"

    const [selectedCrypto, setSelectedCrypto] = useState<CryptoSummary | null>(null);

    const cryptoSummaries: CryptoSummary[] = getCryptoSummariesDummyData();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const queryClient = useQueryClient();

    const { isPending, error, data } = useQuery({
        queryKey: ["watchlist"],
        queryFn: getCoins
    });

    async function getCoins(): Promise<CryptoSummary[]> {
        const url = baseCoinGeckoUrl + "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    
        try {
            const response = await axios.get<CryptoModel[]>(url, {
                headers: {
                    "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY
                }
            });

            const result = response.data.map((c, i) => {
                return {
                    id: i,
                    name: c.name,
                    code: c.symbol.toUpperCase() + "/USDT",
                    coinValue: c.current_price,
                    percentageGrowth: c.price_change_percentage_24h,
                    amountGrowth: c.price_change_24h,
                    icon: c.symbol,
                    iconUrl: c.image

                } as CryptoSummary

            })

            return result;
            
        } catch(error) {
            console.log(error);
        }

        return []
    }


    useEffect(function updateChart () {
        const isNegative = (selectedCrypto?.percentageGrowth ?? 0) < 0;

        function positiveColor() { 
            return (isNegative ?  "#e93e31": "#3478f6");
        };

        function positiveColorWithAlpha() { 
            return (isNegative ?  "#e93e312A": "#3478f62A");
        };

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: selectedCrypto?.name,
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    borderColor: positiveColor(),
                    tension: 1,
                    backgroundColor: positiveColorWithAlpha()
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            plugins: {
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: 60,
                            yMax: 60,
                            borderColor: positiveColor(),
                            borderWidth: 1,
                            borderDash: [2, 2],
                            drawTime: "afterDraw",
                            init: true,
                            label: {
                                display: true,
                                content: selectedCrypto?.coinValue,
                                position: "start",
                                backgroundColor: positiveColor()
                            }
                        }
                    }
                },
                legend: {
                    display: false,
                    labels: {
                        color: textColor
                    }
                    // tooltips: {
                    //     callbacks: {
                    //        label: function(tooltipItem: any) {
                    //               return tooltipItem.yLabel;
                    //        }
                    //     }
                    // }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [selectedCrypto]);

    const [chartPeriod, setChartPeriod] = useState(null);
    const chartPeriods = [
        { label: '1D', value: 1 },
        { label: '1W', value: 2 },
        { label: '1M', value: 3 },
        { label: '3M', value: 4 },
        { label: '6M', value: 5 },
        { label: '1Y', value: 6 }
    ];

    return (
        <div className="watchlist-container">
            <div className='watchlist-cards-container'>
                <div className='watchlist-header'>
                    
                    <div className='header-title'>
                        <span>Watchlist</span>
                        
                        <div className="add-icon">
                            {/* @ts-ignore */}
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                        </div>
                    </div>
                    
                    <div className="arrow-buton">
                        {/* @ts-ignore */}
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                    </div>
                </div>

                <div className='watchlist-content'>
                    {
                        data?.map((c) => {
                            return (
                                <WatchListCard 
                                    key={ c.id }
                                    crypto={c}
                                    isSelected={c.id === selectedCrypto?.id}
                                    onClick={(c) => setSelectedCrypto(c)}/>
                            );
                        })
                    }

                </div>
            </div>

            <div className="watchlist-chart-container">
                
                <div className="chart-header">
                    <div className="left-side">
                        <div className="coin-selector">
                            <Dropdown
                                value={selectedCrypto}
                                width={300}
                                onChange={(e: DropdownChangeEvent) => {
                                    setSelectedCrypto(e.value);
                                }}
                                options={data}
                                optionLabel="code"
                                placeholder="Select a Crypto"
                                filter
                                // dropdownIcon={(options) => {
                                //     {/* @ts-ignore */}
                                //     return <FontAwesomeIcon icon="fa-solid fa-sort-down" {...options.iconProps} /> 
                                // }} 
                            />
                        </div>

                        {
                            selectedCrypto ? 
                                <ChartSummary crypto={selectedCrypto} /> :
                            <div className="select-coin">Select a crypto</div>
                        }

                        
                    </div>
                    
                    <div className="chart-controls">
                        <SelectButton 
                            className="select-button"
                            value={chartPeriod}
                            options={chartPeriods}
                            onChange={(e) => setChartPeriod(e.value)}
                        />
                    </div>
                </div>

                <div className="crypto-chart">
                    {
                        selectedCrypto ?
                        <Chart type="line" data={chartData} options={chartOptions} /> :
                        <div>
                            Select a cryto
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}