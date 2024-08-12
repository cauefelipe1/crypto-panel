import "./Watchlist.scss";

import { useState, useEffect } from "react";
import { getCryptoSummariesDummyData } from "./Watchlist.helpers";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart as Chartjs} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from 'primereact/chart';
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { CryptoSummary } from "../../../models/Crypto";
import WatchListCard from "./WatchListCard";


Chartjs.register(annotationPlugin);

export default function Watchlist() {
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoSummary | null>(null);

    const cryptoSummaries: CryptoSummary[] = getCryptoSummariesDummyData();

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    borderColor: 'rgba(52, 120, 246, 1)', //documentStyle.getPropertyValue('--red-500'),
                    tension: 1,
                    backgroundColor: 'rgba(52, 120, 246, 0.2)'
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
                            //value: 60,
                            borderColor: 'rgba(52, 120, 246, 1)',
                            borderWidth: 1,
                            borderDash: [2, 2],
                            drawTime: "afterDraw",
                            init: true,
                            
                            
                            label: {
                                display: true,
                                content: "Test",
                                position: "start",
                                backgroundColor: 'rgba(52, 120, 246, 1)',
                            }
                            
                            //borderDashOffset: 5
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
    }, []);

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
                        cryptoSummaries.map((c) => {
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
                                options={cryptoSummaries}
                                optionLabel="code"
                                placeholder="Select a Crypto"
                                filter
                                // dropdownIcon={(options) => {
                                //     {/* @ts-ignore */}
                                //     return <FontAwesomeIcon icon="fa-solid fa-sort-down" {...options.iconProps} /> 
                                // }} 
                            />
                        </div>

                        <div className="coin-summary">
                            {
                                selectedCrypto ? 
                                (<>
                                    <div className="coin-value">
                                        {selectedCrypto.coinValue.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                                    </div>

                                    <div className="coin-growth">
                                        
                                        <span className="amount">
                                            {selectedCrypto.amountGrowth.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                                        </span> 
                                        
                                        {/* @ts-ignore */}
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />

                                        <span className="percentage">
                                            {selectedCrypto.percentageGrowth}%
                                        </span>
                                    </div>
                                </>) :
                                <div className="select-coin">Select a crypto</div>
                            }
                            
                        </div>
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
                    <Chart type="line" data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}