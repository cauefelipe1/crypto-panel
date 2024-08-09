import { useState } from "react";
import "./QuickExchange.scss";

import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import CryptoConversionInput from "../CryptoConversionInput/CryptoConversionInput";
import QuickCryptoAmountSelector from "../QuickCryptoAmountSelector/QuickCryptoAmountSelector";

export default function QuickExchange() {
    const tradeOptions: string[] = ['Buy', 'Sell'];
    const [selectedTradeOption, setSelectedTradeOption] = useState<string>(tradeOptions[0]);

    return (
        <div className="quick-exchange-container">
            <div className="quick-exchange-header">
                <h3>Exchange</h3>

                <SelectButton 
                    value={selectedTradeOption}
                    onChange={(e: SelectButtonChangeEvent) =>  setSelectedTradeOption(e.value)}
                    options={tradeOptions}/>
            </div>

            <div className="quick-exchange-conversion">
                <div className="from">
                    <div>
                        From <span className="crypto-name">Ethereum</span>
                    </div>
                    
                    <CryptoConversionInput />                    
                </div>

                <div className="to">
                    <div>
                        To <span className="crypto-name">Tether</span>
                    </div>

                    <CryptoConversionInput />
                </div>

                <QuickCryptoAmountSelector />
            </div>
            
        </div>
    );
}