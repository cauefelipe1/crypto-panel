import "./CoinSummary.scss";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CryptoSummary } from "../../../models/Crypto";

export type ChartSummaryProps = {
    crypto: CryptoSummary
}

export default function ChartSummary({ crypto }: ChartSummaryProps) {
    return (
        <div className="coin-summary-container">
            
            <div
                className={"coin-value " + 
                    (crypto.coinValue < 0 ? "negative" : "positive")
                }
            >
                {crypto.coinValue.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}
            </div>

            <div
                className={"coin-growth " + 
                    (crypto.coinValue < 0 ? "negative" : "positive")
                }
            >    
                <span className="amount">
                    {crypto.amountGrowth.toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                </span> 

                {
                    crypto.coinValue < 0 ?
                    
                    /* @ts-ignore */
                    <FontAwesomeIcon icon="fa-solid fa-arrow-trend-down" /> :

                    /* @ts-ignore */
                    <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />
                }

                <span className="percentage">
                    {crypto.percentageGrowth}%
                </span>
            </div>
        </div>
    );
}
