import "./Watchlist.scss";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart as Chartjs} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'primereact/chart';
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { CryptoHistoricalData, CryptoModel, CryptoSummary } from "../../../models/Crypto";
import WatchListCard from "./WatchListCard";
import ChartSummary from "./CoinSummary";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";

Chartjs.register(annotationPlugin);

export default function Watchlist() {
    const baseCoinGeckoUrl = "https://api.coingecko.com/api/v3/"

    const [selectedCrypto, setSelectedCrypto] = useState<CryptoSummary | null>(null);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    //const queryClient = useQueryClient();

    const cryptosQuery = useQuery({
        queryKey: ["watchlist"],
        queryFn: getCoins
    });

    const chartDataQuery = useQuery({
        queryKey: ["chart", selectedCrypto?.id],
        queryFn: getCoinChartData,
        enabled: !!selectedCrypto
    });

    async function getCoins(): Promise<CryptoSummary[]> {
        const url = baseCoinGeckoUrl + "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    
        try {
            const response = await axios.get<CryptoModel[]>(url, {
                headers: {
                    "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY
                }
            });

            const result = response.data.map((c, i) => {
                return {
                    id: c.id,
                    name: c.name,
                    code: c.symbol.toUpperCase() + "/USDT",
                    coinValue: c.current_price,
                    percentageGrowth: c.price_change_percentage_24h,
                    amountGrowth: c.price_change_24h,
                    icon: c.symbol,
                    iconUrl: c.image

                } as CryptoSummary

            });

            return result;
            
        } catch(error) {
            console.log(error);
        }

        return [];
    }

    async function getCoinChartData(): Promise<CryptoHistoricalData | undefined> {
        const url = baseCoinGeckoUrl + "coins/" + selectedCrypto?.id + "/market_chart?vs_currency=USD&days=30&interval=daily";
    
        try {
            const response = await axios.get<CryptoHistoricalData>(url, {
                headers: {
                    "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API_KEY
                }
            });

            return response.data;
            
        } catch(error) {
            console.log(error);
        }

        return undefined;
    }

    useEffect(function updateChart () {
        if (!selectedCrypto) {
            return;
        }

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

        getCoinChartData().then((chartData) => {
            console.log("Data for chart", chartData);
            
            const prices = chartData?.prices.map((p) => {
                return {
                    date: DateTime.fromMillis(p[0]),
                    value: p[1]
                };
            });

            const data = {
                labels: prices?.map((p) => p.date.toFormat("yyyy-MM-dd")),
                datasets: [
                    {
                        label: selectedCrypto?.name,
                        data: prices?.map(p => p.value),
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
                                yMin: selectedCrypto?.coinValue,
                                yMax: selectedCrypto?.coinValue,
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
        });

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

    async function handleCryptoCardClick(crypto: CryptoSummary) {
        try{
            //await chartDataQuery.refetch();
            setSelectedCrypto(crypto);

        } catch(e) {
            
        }    
    }

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
                        cryptosQuery.data?.map((c) => {
                            return (
                                <WatchListCard 
                                    key={ c.id }
                                    crypto={c}
                                    isSelected={c.id === selectedCrypto?.id}
                                    onClick={handleCryptoCardClick}/>
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
                                options={cryptosQuery.data}
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