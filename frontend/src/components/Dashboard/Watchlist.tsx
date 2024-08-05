import "./Watchlist.scss";

import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'primereact/image';

export default function Watchlist() {
    const cards = [
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        },
        {
            name: "Bitcoin",
            code: "BTC/USDT",
            value: 1234.9,
            percentage: 1.3,
            icon: "B"
        }
    ];

    return (
        <div className='watchlist-container'>
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
                    cards.map((c) => {
                        return (
                            // Move to a new component
                            <div
                                key={ uuidv4() } 
                                className='watchlist-card'
                            >
                                <div className='card-icon'>
                                    <Image src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="Image" width='40'/>
                                </div>

                                <div className='card-content'>
                                    <div className="card-header">
                                        <span className="coin-name">{c.name}</span>
                                        <span className="coin-code">{c.code}</span>
                                    </div>

                                    <div className="card-value">
                                        <span className="coin-value">{c.value}</span>
                                        
                                        <div className="coin-growth">
                                            {/* @ts-ignore */}
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />

                                            <span>{c.percentage}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }

            </div>

        </div>
    );
}