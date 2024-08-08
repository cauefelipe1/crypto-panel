import { useState } from "react";
import "./QuickExchange.scss";

import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { Nullable } from "primereact/ts-helpers";

export default function QuickExchange() {
    const tradeOptions: string[] = ['Buy', 'Sell'];
    const [selectedTradeOption, setSelectedTradeOption] = useState<string>(tradeOptions[0]);

    const [fromAmount, setFromAmount] = useState<Nullable<number>>(0.0);

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
                    
                    {/* <div className="p-inputgroup" style={{width: "100%"}}> */}
                        <Dropdown />
                        <InputNumber value={fromAmount} onValueChange={(e: InputNumberValueChangeEvent) => setFromAmount(e.value)}/>
                        
                    {/* </div> */}
                    
                </div>

                <div className="to">
                    To <span className="crypto-name">Tether</span>
                </div>

            </div>
            
        </div>
    );
}