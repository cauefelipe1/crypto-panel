import './Dashboard.scss';

import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'primereact/image';

export default function Dashboard() {
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
        <div>
            <h2>Dashboard</h2>

            <div className='watchlist-container'>
                <div className='header'>
                    
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
                                <div
                                    key={ uuidv4() } 
                                    className='watchlist-card'
                                >
                                    <div className='icon'>
                                        <Image src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="Image" width='40'/>
                                    </div>

                                    <div className='card-content'>
                                        <div>
                                            <span>{c.name}</span> <span>{c.code}</span>
                                        </div>
                                        <div>
                                            <span>{c.value}</span> <span>{c.percentage}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>

            </div>

        </div>
    );
}