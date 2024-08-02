import {v4 as uuidv4} from 'uuid';

import './LoggedLandpage.scss';

export default function LoggedLandpage() {

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
        <div className='main-app-container'>

            <div className='app-section side-menu'> Side Menu</div>

            <div className='app-section content'>

                <div>
                    <h1>Dashboard</h1>

                    <div className='watchlist-container'>
                        <div className='header'>
                            
                            <div className='header-title'>
                                <span>Watchlist</span> <span>I</span>
                            </div>
                            <span>=D</span>
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
                                                {c.icon}
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

            
            </div>

            <div className='app-section highlights'> Something</div>

        </div>
    );
}