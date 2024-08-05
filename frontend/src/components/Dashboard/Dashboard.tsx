import './Dashboard.scss';

import Watchlist from './Watchlist';

export default function Dashboard() {

    return (
        <div>
            <div className="page-header header">
                <h1>Dashboard</h1>
            </div>

            <Watchlist />

        </div>
    );
}