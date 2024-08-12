import "./WatchListCard.scss";

import { CryptoSummary } from "../../../models/Crypto";
import { Image } from 'primereact/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type WatchListCardProps = {
    crypto :CryptoSummary;
    isSelected: boolean;
    onClick: (crypto: CryptoSummary) => void;
}

export default function WatchListCard({crypto, isSelected, onClick} :WatchListCardProps) {

    return (
        <div
            key={ crypto.id } 
            className={
                "watchlist-card " + 
                (crypto.coinValue < 0 ? "negative" : "positive") +
                (isSelected ? " selected" : "")
            }
            onClick={() => {
                onClick ? onClick(crypto) : null;
            }}
            >
            <div 
                className={"card-icon " + 
                    (crypto.coinValue < 0 ? "negative" : "positive") +
                    (isSelected ? " selected" : "")
                }
            >
                <Image src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="Image" width='40'/>
            </div>

            <div className='card-content'>
                <div className="card-header">
                    <span className="coin-name">{crypto.name}</span>
                    <span 
                        className={"coin-code " + 
                            (crypto.coinValue < 0 ? "negative" : "positive") +
                            (isSelected ? " selected" : "")
                        }
                    >
                            {crypto.code}
                    </span>
                </div>

                <div className="card-value">
                    <span className="coin-value">{crypto.coinValue}</span>
                    
                    <div
                        className={"coin-growth " + 
                            (crypto.coinValue < 0 ? "negative" : "positive") +
                            (isSelected ? " selected" : "")
                        }
                    >
                        {
                            crypto.coinValue < 0 ?
                            
                            /* @ts-ignore */
                            <FontAwesomeIcon icon="fa-solid fa-arrow-trend-down" /> :

                            /* @ts-ignore */
                            <FontAwesomeIcon icon="fa-solid fa-arrow-trend-up" />
                        }

                        <span>{crypto.percentageGrowth}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}